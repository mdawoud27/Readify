const express = require("express");
const {
  register,
  login,
  getRegisterView,
  getLoginView,
} = require("../controllers/authController");
const router = express.Router();

// /api/auth/register
router.route("/register").get(getRegisterView).post(register);

// /api/auth/login
router.route("/login").get(getLoginView).post(login);

module.exports = router;
