const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const {name, email, password , role } = req.body

try {
    const existingUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if (existingUser) {
        return res.status(400).json({
            message: 'User already exists'
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
        data: {
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        }
    })

    const token = jwt.sign({
        id: user.id,
        email: user.email,
        role: user.role
    }, process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: '1h'
    }
)
    res.status(201).json({
        message: 'User created successfully',
        token: token
    })
} catch (err) {
    res.status(500).json({
        message: err.message
    })
}
}