const express = require("express");
const router = express.Router();
const {
  createNewOrder,
  getMyOrders,
  getOrdersDetails,
  updateOrder,
  cancelOrder,
} = require("../../../controllers/userControllers/orderControllers/orderController");
const VerifyJWT = require("../../../middleware/authmiddleware/VerifyJWT");
const {
  orderValidator,
  updateItemsRules,
  runValidation,
} = require("../../../validators/generalValidators/orderValidator");
const {
  customerRole,
} = require("../../../middleware/role-based-middleware/checkRole");

router.post( "/new", VerifyJWT, customerRole, orderValidator, runValidation, createNewOrder );

router.get("/all", VerifyJWT, customerRole, getMyOrders);

router.get("/details/:id", VerifyJWT, customerRole, getOrdersDetails);

router.put("/cancel/:id", VerifyJWT, customerRole, cancelOrder);


module.exports = router;
