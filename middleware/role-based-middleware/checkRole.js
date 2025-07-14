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

// this function may be not used now
const checkRole = async (req , res , next) => {
    const {role} = req.user
    if(role === 'ADMIN' || role === 'RESTAURANT'){
        next()
    }
    else {
        return res.status(403).json({
            message : 'Forbidden'
        })
    }
}

module.exports = {adminRole , checkRole}