const express = require("express");
const router = express.Router();
const {createNewOrder} = require('../../controllers/orderControllers/orderController')
const VerifyJWT = require('../../middleware/authmiddleware/VerifyJWT')
const {orderValidator , runValidation} = require('../../validators/generalValidators/orderValidator')
const {customerRole} = require('../../middleware/role-based-middleware/checkRole')

router.post('/new' , VerifyJWT , customerRole , orderValidator  , createNewOrder)

module.exports = router