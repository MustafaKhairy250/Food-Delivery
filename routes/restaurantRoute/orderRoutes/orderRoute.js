const express = require("express");
const router = express.Router();
const {getAllOrders , acceptOrder , declineOrder} = require("../../../controllers/restaurantControllers/orderControllers/orderController");
const VerifyJWT = require("../../../middleware/authmiddleware/VerifyJWT");
const {restaurantRole} = require("../../../middleware/role-based-middleware/checkRole");

router.get("/all/:id", VerifyJWT, restaurantRole, getAllOrders);
router.put("/:restId/accept/:id", VerifyJWT, restaurantRole, acceptOrder);
router.put("/:restId/decline/:id", VerifyJWT, restaurantRole, declineOrder);

module.exports = router;