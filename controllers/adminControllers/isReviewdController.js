const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()

exports.getUnreviewedRestaurants = async (req , res) =>{
    try {
        const rest = await prisma.user.findMany({
            where : {
                role : 'RESTAURANT',
                isreviewd : null
            }
        })
        res.status(200).json({
            rest
        })
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}

exports.updateReview = async (req , res) => {
    const {id} = req.params
    const {isreviewd} = req.body
    try {
        const updated = await prisma.user.update({
            where : {
                id : Number(id)
            },
            data : {
                isreviewd : isreviewd
            }
        })
        res.status(200).json({
            updated
        })
    } catch (err) {
        res.status(500).json({
            message : err.message
        })
    }
}