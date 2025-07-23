const express = require("express");
const router = express.Router();
const {getMyDeletedRestaurants , restoreDeletedRestaurant} = require('../../../controllers/restaurantControllers/authControllers/restoreDeletedController')
const VerifyJWT = require('../../../middleware/authmiddleware/VerifyJWT')
const {restaurantRole} = require('../../../middleware/role-based-middleware/checkRole')



router.get('/' , VerifyJWT , restaurantRole , getMyDeletedRestaurants)
router.put('/restore/:id' , VerifyJWT , restaurantRole , restoreDeletedRestaurant)

module.exports = router