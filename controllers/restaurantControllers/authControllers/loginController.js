const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

exports.restaurantLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
                deleted : false
            },
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                phone : true,
                role : true,
                isreviewd : true
            }
        })

        if (!user) {
            return res.status(404).json({
                message: 'Invalid credentials or your account has been deleted'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }
        if(user.isreviewd === null) return res.json({message : 'Please wait for admin to review your account'})
        if(user.isreviewd === false) return res.json({message : 'Your account has not been approved'}) // in case we edit reviewcreate controller
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role,
            isreviewd : user.isreviewd
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h'
        })
        const userData = {
            name : user.name,
            email : user.email,
            phone : user.phone
        }
        res.status(200).json({
            user : userData,
            token: token
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}