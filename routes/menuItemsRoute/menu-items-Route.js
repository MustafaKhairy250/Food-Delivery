const express = require("express");
const router = express.Router();
const {getAllMenuItems , getOneMenuItem , createMenuItem, updateMenuItem , deleteMenuItem} = require('../../controllers/menuItemController/menuItemController')
const verifyJWT = require('../../middleware/authmiddleware/VerifyJWT')
const {menuItemRules ,updateMenuItemRules ,runValidation} = require('../../validators/generalValidators/menuItemValidator')
const {restaurantRole} = require('../../middleware/role-based-middleware/checkRole')


router.get('/:restId' ,verifyJWT ,getAllMenuItems) // Get all menu items
router.get('/:restId/:id' ,verifyJWT ,getOneMenuItem) // Get one menu item

router.post('/:restId' , verifyJWT ,restaurantRole, menuItemRules , runValidation , createMenuItem) // Create a new menu item restaurant-owner-only

router.put('/:id' , verifyJWT ,restaurantRole , updateMenuItemRules , runValidation , updateMenuItem) // Update a menu item restaurant-owner-only
router.delete('/:id' , verifyJWT ,restaurantRole , deleteMenuItem) // Delete a menu item restaurant-owner-only

module.exports = router