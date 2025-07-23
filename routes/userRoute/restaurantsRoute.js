const express = require("express");
const router = express.Router();
const {getAllRestaurants , getOneRestaurant , getOneMenuItem} = require('../../controllers/userControllers/restaurantsController')
const VerifyJWT = require('../../middleware/authmiddleware/VerifyJWT')
const {customerRole} = require('../../middleware/role-based-middleware/checkRole')


router.get('/' , VerifyJWT ,customerRole ,getAllRestaurants)
router.get('/:id' , VerifyJWT , customerRole,getOneRestaurant)
router.get('/:restId/menu-items/:id' , VerifyJWT , customerRole ,getOneMenuItem)

module.exports = router