const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

exports.createRestaurant = async (req , res ) =>{
    const {name , address , ownerId} = req.body
    try{
        const newRestaurant = await prisma.restaurant.create({
            data : {
                name : name,
                address : address,
                ownerId : ownerId
            }
        })
        res.status(201).json(newRestaurant)
    }
    catch(err){
        res.status(500).json({
            message : err.message
        })
    }
}

exports.updateRestaurant = async (req , res) =>{
    const {id} = req.params
    const {name , address} = req.body

    const data = {}
    if(name){
        data.name = name
    }
    if(address){
        data.address = address
    }
    try {
        const updated = await prisma.restaurant.update({
            where : {
                id : Number(id)
            },
            data
        })
        res.status(200).json({
            updated
        })
    } catch (error) {
        if (err.code === 'P2025') // not found
            return res.status(404).json({ message: 'Restaurant not found' });
        res.status(500).json({
            message : err.message
        })
    }
};

exports.deleteRestaurant = async (req , res) => {
    const {id} = req.params
    try {
        const deleted = await prisma.restaurant.delete({
            where : {
                id : Number(id)
            }
        })
        res.status(200).json({
            deleted
        })
    } catch (err) {
        if (err.code === 'P2025') // not found
            return res.status(404).json({ message: 'Restaurant not found' });
        res.status(500).json({
            message : err.message
        })
    }
}

exports.getAllRestaurants = async (req , res) => {
    try {
        const restaurants = await prisma.restaurant.findMany({
            include :{
                menuItem : true
            }
        })
        res.status(200).json({
            restaurants
        })
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}

exports.getOneRestaurant = async (req , res) => {
    const {id: paramId} = req.params
    const {role , id:userId} = req.user

    let restaurant;

    try {
        if(role === 'ADMIN'){
            if (!paramId) {
                return res.status(400).json({
                    message: "Restaurant ID is required for admin"
                });
            }
            restaurant = await prisma.restaurant.findUnique({
                where : {
                    id : Number(paramId)
                },
                include : {
                    menuItem : true
                }
            })
        }
        else if(role ==='RESTAURANT'){
            restaurant = await prisma.restaurant.findMany({
                where : {
                    ownerId : Number(userId)
                },
                include : {
                    menuItem : true
                }
            })
        }        

        if(!restaurant) {
            return res.status(404).json({
                message : 'Restaurant not found for this user'
            })
        }

        res.status(200).json({
            restaurant
        })
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}

exports.getRestaurantsByOwnerId = async (req , res) => {
    const {id : paramId} = req.params
    try {
        const restaurant = await prisma.restaurant.findMany({
            where : {
                ownerId : Number(paramId)
            },
            include : {
                menuItem : true
            }
        })
        res.status(200).json({
            restaurant
        })
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}