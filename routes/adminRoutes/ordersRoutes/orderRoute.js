const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOneOrder,
  getRestaurantOrders,
  getUserOrders,
  updateOrderStatus,
} = require("../../../controllers/adminControllers/ordersControllers/orderController");
const VerifyJWT = require("../../../middleware/authmiddleware/VerifyJWT");
const {
  adminRole,
} = require("../../../middleware/role-based-middleware/checkRole");


router.get("/all", VerifyJWT, adminRole, getAllOrders);
router.get("/user/:id", VerifyJWT, adminRole, getUserOrders);
router.get("/rest/:id", VerifyJWT, adminRole, getRestaurantOrders);
router.get("/:id", VerifyJWT, adminRole, getOneOrder);
router.put("/update/:id", VerifyJWT, adminRole, updateOrderStatus);

module.exports = router;