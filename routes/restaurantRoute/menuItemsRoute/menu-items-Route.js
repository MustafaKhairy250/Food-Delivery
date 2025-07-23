const express = require("express");
const router = express.Router();
const {getAllMenuItems , getOneMenuItem , createMenuItem, updateMenuItem , deleteMenuItem} = require('../../../controllers/restaurantControllers/menuItemController/menuItemController')
const verifyJWT = require('../../../middleware/authmiddleware/VerifyJWT')
const {menuItemRules ,updateMenuItemRules ,runValidation} = require('../../../validators/generalValidators/menuItemValidator')
const {restaurantRole} = require('../../../middleware/role-based-middleware/checkRole')


router.get('/:restId/menu-items' ,verifyJWT ,restaurantRole,getAllMenuItems) // Get all menu items for a specific restaurant
router.get('/:restId/menu-items/:id' ,verifyJWT ,restaurantRole,getOneMenuItem) // Get one menu item for a specific restaurant

router.post('/:restId/menu-items/new' , verifyJWT ,restaurantRole, menuItemRules , runValidation , createMenuItem) // Create a new menu item restaurant-owner-only

router.put('/:restId/menu-items/update/:id' , verifyJWT ,restaurantRole , updateMenuItemRules , runValidation , updateMenuItem) // Update a menu item restaurant-owner-only
router.delete('/:restId/menu-items/delete/:id' , verifyJWT ,restaurantRole , deleteMenuItem) // Delete a menu item restaurant-owner-only

module.exports = router