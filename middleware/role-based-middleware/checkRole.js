
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
    const {role , isreviewd} = req.user
    if(role === 'RESTAURANT' && isreviewd === true){
        next()
    }
    else {
        return res.status(403).json({
            message : 'Forbidden'
        })
    }
}

const customerRole = async (req , res , next) => {
    const {role} = req.user
    if(role === 'CUSTOMER'){
        next()
    }
    else {
        return res.status(403).json({
            message : 'Forbidden'
        })
    }
}
module.exports = {adminRole , restaurantRole , customerRole}