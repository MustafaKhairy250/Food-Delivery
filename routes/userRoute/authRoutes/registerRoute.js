const express = require('express')
const router = express.Router()
const {userRegister} = require('../../../controllers/userControllers/authControllers/registerController')
const {registerRules , runValidation} = require('../../../validators/authValidators/authValidator')

router.post('/auth/register', registerRules , runValidation ,userRegister)

module.exports = router