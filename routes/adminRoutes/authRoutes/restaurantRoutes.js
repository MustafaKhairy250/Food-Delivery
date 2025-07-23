const express = require("express");
const router = express.Router();
const { getRestaurants , getOneRestaurant , deleteRestaurant} = require('../../../controllers/adminControllers/authControllers/restaurantController')
const VerifyJWT = require("../../../middleware/authmiddleware/VerifyJWT");
const {adminRole} = require("../../../middleware/role-based-middleware/checkRole");


router.get("/" , VerifyJWT , adminRole ,getRestaurants) // Get all restaurants and specific user's restaurants
router.get("/:id" , VerifyJWT , adminRole ,getOneRestaurant) // Get one restaurant
router.put("/delete/:id" , VerifyJWT , adminRole ,deleteRestaurant) // Delete one restaurant 

module.exports = router