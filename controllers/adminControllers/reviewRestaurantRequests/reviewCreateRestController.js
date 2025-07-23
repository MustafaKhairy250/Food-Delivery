const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()


exports.getAllNewRestaurant = async (req , res) =>{
    try {
        const getAll = await prisma.restaurant.findMany({
            where : {
                status : "REVIEWING"
            },select : {
                id : true,
                name : true,
                address : true,
                ownerId : true,
                createdAt : true
            }
        })
        res.status(200).json({
            getAll
        })
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}
//assuming that all restaurants are approved 
exports.confirmNewRest = async (req , res) =>{
    const {id : restId} = req.params
    try {
        const existing = await prisma.restaurant.findUnique({
            where : {
                id : Number(restId),
                status : "REVIEWING"
            }
        })
        if(!existing) return res.status(404).json({
            message : "Not Found"
        })
        await prisma.restaurant.update({
            where : {
                id : Number(restId)
            },
            data : {
                status : "REVIEWED",
                reviewdAt : new Date()
            }
        })
        res.status(200).json({
            message : "Successfully Created"
        })
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}