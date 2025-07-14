const express = require('express')
const router = express.Router()
const {login} = require('../../controllers/authControllers/loginController')
const {loginRules , runValidation} = require('../../validators/authValidators/authValidator')

router.post('/login', loginRules , runValidation ,login)


module.exports = router