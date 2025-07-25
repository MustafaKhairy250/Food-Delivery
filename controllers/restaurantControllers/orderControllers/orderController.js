const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllOrders = async (req , res) => {
    const { id : userId } = req.user
    const { id : restaurantId } = req.params
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where : {
                id : Number(restaurantId),
                ownerId : Number(userId)
            }
        })
        if(!restaurant) {
            return res.status(403).json({error : "Access denied"})
        }
        const orders = await prisma.order.findMany({
            where : {
                restaurantId : Number(restaurantId)
            }
        })
        res.status(200).json(orders)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

exports.acceptOrder = async (req , res) => {
    const { id : userId } = req.user
    const { id : orderId , restId} = req.params
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where : {
                id : Number(restId),
                ownerId : Number(userId)
            }
        })
        if(!restaurant) {
            return res.status(403).json({error : "Access denied"})
        }

        const order = await prisma.order.update({
            where : {
                id : Number(orderId)
            },
            data : {
                status : "ACCEPTED",
                updatedAt : new Date()
            }
        })
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}

exports.declineOrder = async (req , res) => {
    const { id : userId } = req.user
    const { id : orderId , restId} = req.params
    try {
        const restaurant = await prisma.restaurant.findUnique({
            where : {
                id : Number(restId),
                ownerId : Number(userId)
            }
        })
        if(!restaurant) {
            return res.status(403).json({error : "Access denied"})
        }
        const prepOrder = await prisma.order.findUnique({
            where : {
                id : Number(orderId),
                status : "PENDING"
            }
        })
        if(!prepOrder) {
            return res.status(400).json({error : "Order is not pending"})
        }
        const order = await prisma.order.update({
            where : {
                id : Number(orderId)
            },
            data : {
                status : "DECLINED",
                updatedAt : new Date()
            }
        })
        res.status(200).json(order)
    } catch (error) {
        res.status(400).json({error : error.message})
    }
}