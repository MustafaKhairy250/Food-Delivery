const express = require('express')
const router = express.Router()
const {getAllNewRestaurant , confirmNewRest} = require('../../../controllers/adminControllers/reviewRestaurantRequests/reviewCreateRestController')
const VerifyJWT = require('../../../middleware/authmiddleware/VerifyJWT')
const {adminRole} = require('../../../middleware/role-based-middleware/checkRole')


router.get('/new/all' , VerifyJWT , adminRole ,getAllNewRestaurant)
router.put('/confirm/:id' , VerifyJWT , adminRole ,confirmNewRest)


module.exports = router
