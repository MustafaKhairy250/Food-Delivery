const express = require('express')
const router = express.Router()
const {getUser , updateUser , deleteUser , addUserAddress , getAllUserAdresses} = require('../../controllers/userControllers/userController')
const VerifyJWT = require('../../middleware/authmiddleware/VerifyJWT')
const {updateRules , runValidation} = require('../../validators/authValidators/authValidator')

router.get('/me' , VerifyJWT , getUser)
router.put('/me' , VerifyJWT , updateRules , runValidation , updateUser)
router.delete('/me' , VerifyJWT , deleteUser)
router.post('/me/address/new' , VerifyJWT , addUserAddress)
router.get('/me/addresses' , VerifyJWT , getAllUserAdresses)

module.exports = router