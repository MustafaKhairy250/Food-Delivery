const express = require("express");
const router = express.Router();
const { createRestaurant , updateRestaurant , deleteRestaurant ,getMyRestaurants , getOneRestaurant} = require('../../../controllers/restaurantControllers/authControllers/CRUD_restaurantController')
const VerifyJWT = require("../../../middleware/authmiddleware/VerifyJWT");
const { restaurantRole} = require("../../../middleware/role-based-middleware/checkRole");


router.get("/", VerifyJWT, restaurantRole,getMyRestaurants); // Get My restaurants 
router.get("/:id" , VerifyJWT ,restaurantRole ,getOneRestaurant) // Get One Restaurant
router.post("/create" , VerifyJWT , restaurantRole , createRestaurant) // Create a new restaurant
router.put("/update/:id" , VerifyJWT , restaurantRole , updateRestaurant) // Update a restaurant 
router.put("/delete/:id" , VerifyJWT , restaurantRole , deleteRestaurant) // Delete a restaurant

module.exports = router;