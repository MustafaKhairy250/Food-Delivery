const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

exports.getAllOrders = async (req , res) => {
    try {
        const orders = await prisma.order.findMany({
           select : {
                id : true,
                status : true,
                total : true,
                createdAt : true
            }
        })
        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.getOneOrder = async (req , res) => {
    const {id : orderId} = req.params

    try {
    const order = await prisma.order.findUnique({
        where : {
            id : Number(orderId)
        },include : {
            items : true,
            deliveryAddress : true
        }
    })
    res.json(order)
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.getRestaurantOrders = async (req , res) => {
    const {id : restId} = req.params
    try {
        const orders = await prisma.order.findMany({
            where : {
                restaurantId : Number(restId)
            },select : {
                id : true,
                status : true,
                total : true,
                createdAt : true
            }
        })
        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.getUserOrders = async (req , res) => {
    const {id : userId } = req.params
    try {
        const orders = await prisma.order.findMany({
            where : {
                userId : Number(userId)
            },select : {
                id : true,
                userId : true,
                status : true,
                total : true,
                createdAt : true
            }
        })
        if(!Array.isArray(orders) || orders.length === 0) {
            return res.status(404).json({ message: " There are no orders for this user" });
        }
        res.json(orders)
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}

exports.updateOrderStatus = async (req , res) => {
    const {id : orderId} = req.params
    const {status} = req.body
    try {
        const order = await prisma.order.update({
            where : {
                id : Number(orderId)
            },
            data : {
                status : status,
                updatedAt : new Date()
            }
        })
        res.json(order)
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}