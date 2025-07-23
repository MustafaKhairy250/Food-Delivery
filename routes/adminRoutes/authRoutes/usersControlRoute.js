const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUnreviewedUsers,
  updateUser,
  deleteUser,
} = require("../../../controllers/adminControllers/authControllers/usersControl");
const VerifyJWT = require("../../../middleware/authmiddleware/VerifyJWT");
const {
  adminRole,
} = require("../../../middleware/role-based-middleware/checkRole");

router.get("/", VerifyJWT, adminRole, getUsers); //get all users or specific user in query
router.get("/unreviewed", VerifyJWT, adminRole, getUnreviewedUsers); //get all unreviewed users
router.put("/update/:id", VerifyJWT, adminRole, updateUser); //update user
router.put("/delete/:id", VerifyJWT, adminRole, deleteUser); //delete user

module.exports = router;
