const express = require('express')
const router = express.Router()
const {getUser , updateUser , deleteUser } = require('../../../controllers/userControllers/authControllers/userController')
const VerifyJWT = require('../../../middleware/authmiddleware/VerifyJWT')
const {updateRules , runValidation} = require('../../../validators/authValidators/authValidator')

router.get('/me' , VerifyJWT , getUser)
router.put('/me/update' , VerifyJWT , updateRules , runValidation , updateUser)
router.put('/me/delete' , VerifyJWT , deleteUser)

module.exports = router