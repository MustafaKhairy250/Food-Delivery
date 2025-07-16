const express = require('express')
const router = express.Router()
const {restaurantLogin} = require('../../../controllers/restaurantControllers/authControllers/loginController')
const {loginRules , runValidation} = require('../../../validators/authValidators/authValidator')

router.post('/auth/login', loginRules , runValidation ,restaurantLogin)


module.exports = router