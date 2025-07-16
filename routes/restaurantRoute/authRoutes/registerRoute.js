const express = require('express')
const router = express.Router()
const {restaurantRegister} = require('../../../controllers/restaurantControllers/authControllers/registerController')
const {registerRules , runValidation} = require('../../../validators/authValidators/authValidator')

router.post('/auth/register', registerRules , runValidation ,restaurantRegister)

module.exports = router