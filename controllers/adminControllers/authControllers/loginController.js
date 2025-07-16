const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

exports.adminlogin = async (req, res) => {
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

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h'
        })

        res.status(200).json({
            user: {
                name : user.name,
                email : user.email,
                phone : user.phone,
            },
            token: token
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}