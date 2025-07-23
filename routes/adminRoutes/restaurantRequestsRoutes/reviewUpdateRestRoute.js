const express = require('express')
const router = express.Router()
const {getAllUpdateRequests , updateRestStatus} = require('../../../controllers/adminControllers/reviewRestaurantRequests/reviewUpdateRestController')
const VerifyJWT = require('../../../middleware/authmiddleware/VerifyJWT')
const {adminRole} = require('../../../middleware/role-based-middleware/checkRole')
const {statusRules} = require('../../../validators/authValidators/authValidator')


router.get('/updates/all' , VerifyJWT , adminRole ,getAllUpdateRequests)
router.put('/update/:id' , VerifyJWT , adminRole,statusRules ,updateRestStatus)


module.exports = router