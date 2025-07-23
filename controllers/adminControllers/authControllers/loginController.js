const bcrypt = require('bcrypt')
const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken')

exports.adminlogin = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
                deleted : false
            },select: {
                name: true,
                email: true,
                password: true,
                phone : true,
                role : true
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
        const token = jwt.sign({
            id: user.id,
            email: user.email,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h'
        })
        const {password : pass, role : role ,...userData} = user
        res.status(200).json({
            user : userData,
            token: token
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}