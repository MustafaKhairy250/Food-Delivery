const express = require('express')
const router = express.Router()
const VerifyJWT = require('../../../middleware/authmiddleware/VerifyJWT')
const {customerRole} = require('../../../middleware/role-based-middleware/checkRole')
const {addNewUserAddress , getUserAdresses , updateUserAddress , deleteUserAddress} = require('../../../controllers/userControllers/adressesControllers/adressController')


router.post('/new' , VerifyJWT , customerRole , addNewUserAddress) // Create a new user address //? only customer can have multiple addresses
router.get('/' , VerifyJWT , getUserAdresses) // Get all user addresses or specific address in query
router.put('/update/:id' , VerifyJWT , updateUserAddress) // Update user address
router.delete('/delete/:id' , VerifyJWT , deleteUserAddress) // Delete user address

module.exports = router
