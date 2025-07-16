const express = require('express')
const router = express.Router()
const {adminRegister} = require('../../../controllers/adminControllers/authControllers/registerController')
const {registerRules , runValidation} = require('../../../validators/authValidators/authValidator')

router.post('/auth/register', registerRules , runValidation ,adminRegister)

module.exports = router