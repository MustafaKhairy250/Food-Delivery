const express = require("express");
const router = express.Router();
const {getAllRestaurants , createRestaurant , updateRestaurant , deleteRestaurant ,getOneRestaurant , getRestaurantsByOwnerId} = require('../../controllers/restaurantController/restaurantController')
const VerifyJWT = require("../../middleware/authmiddleware/VerifyJWT");
const {adminRole} = require("../../middleware/role-based-middleware/checkRole");


router.post("/" , VerifyJWT , adminRole , createRestaurant) // Create a new restaurant admin-only
router.get("/all" , VerifyJWT , adminRole ,getAllRestaurants) // Get all restaurants admin-only
router.get('/all/:id' , VerifyJWT ,adminRole ,getRestaurantsByOwnerId) // Get all restaurants by owneriD admin-only
router.get("/:id" , VerifyJWT,getOneRestaurant) // Get one restaurant admin-role
router.get("/", VerifyJWT, getOneRestaurant); // Get My restaurant as restaurant-role
router.put("/:id" , VerifyJWT , adminRole , updateRestaurant) // Update a restaurant admin-only
router.delete("/:id" , VerifyJWT , adminRole , deleteRestaurant) // Delete a restaurant admin-only

module.exports = router