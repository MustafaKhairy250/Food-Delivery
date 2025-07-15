// const {PrismaClient} = require("@prisma/client");
// const prisma = new PrismaClient();

const adminRole = async (req , res , next) => {
    const {role} = req.user
    if(role === 'ADMIN'){
        next()
    }
    else {
        return res.status(403).json({
            message : 'Forbidden'
        })
    }
}

const restaurantRole = async (req , res , next) => {
    const {role} = req.user
    if(role === 'RESTAURANT'){
        next()
    }
    else {
        return res.status(403).json({
            message : 'Forbidden'
        })
    }
}

module.exports = {adminRole , restaurantRole}