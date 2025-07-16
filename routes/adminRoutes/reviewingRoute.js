const express = require('express')
const router = express.Router()
const {getUnreviewedRestaurants , updateReview} = require('../../controllers/adminControllers/isReviewdController')
const VerifyJWT = require('../../middleware/authmiddleware/VerifyJWT')
const { adminRole } = require('../../middleware/role-based-middleware/checkRole')

router.get('/' ,VerifyJWT , adminRole ,getUnreviewedRestaurants)
router.put('/update/:id' ,VerifyJWT , adminRole ,updateReview)

module.exports = router