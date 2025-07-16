const express = require('express')
const router = express.Router()
const {adminlogin} = require('../../../controllers/adminControllers/authControllers/loginController')
const {loginRules , runValidation} = require('../../../validators/authValidators/authValidator')

router.post('/auth/login', loginRules , runValidation ,adminlogin)


module.exports = router