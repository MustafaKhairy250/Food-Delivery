const express = require('express')
const router = express.Router()
const {register} = require('../../controllers/authControllers/registerController')
const {registerRules , runValidation} = require('../../validators/authValidators/authValidator')

router.post('/register', registerRules , runValidation ,register)

module.exports = router