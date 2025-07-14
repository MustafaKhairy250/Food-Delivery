const jwt = require('jsonwebtoken')
require('dotenv').config({override: true})

const VerifyJWT = async (req , res , next) => {
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(' ')[1]
        jwt.verify(token , process.env.ACCESS_TOKEN_SECRET , (err , user) => {
            if(err){
                return res.sendStatus(403)
            }
            req.user = {
                id : user.id,
                email : user.email,
                role : user.role
            }
            next()
        })
    }else {
        return res.sendStatus(401); // Unauthorized
    }
}

module.exports = VerifyJWT