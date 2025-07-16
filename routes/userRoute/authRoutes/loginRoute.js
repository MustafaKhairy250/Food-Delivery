const express = require('express')
const router = express.Router()
const {userLogin} = require('../../../controllers/userControllers/authControllers/loginController')
const {loginRules , runValidation} = require('../../../validators/authValidators/authValidator')

router.post('/auth/login', loginRules , runValidation ,userLogin)


module.exports = router