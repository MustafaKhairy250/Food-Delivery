const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

exports.restaurantLogin = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(404).json({
                message: 'Invalid credentials'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({
                message: 'Invalid credentials'
            })
        }
        if(user.isreviewd === null) return res.json({message : 'Please wait for admin to review your account'})
        if(user.isreviewd === false) return res.json({message : 'Your account is rejected by admin'})
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h'
        })
        const userWithoutPassword = {
            name: user.name,
            email: user.email,
            phone : user.phone
        }
        res.status(200).json({
            userWithoutPassword,
            token: token
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}