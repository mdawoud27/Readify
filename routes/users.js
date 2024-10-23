const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middlewares/verifyToken");

// /api/users/
router.route("/").get(verifyTokenAndAdmin, getAllUsers);

// /api/users/:id
router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getUserById)
  .put(verifyTokenAndAuthorization, updateUser)
  .delete(verifyTokenAndAuthorization, deleteUser);

module.exports = router;
