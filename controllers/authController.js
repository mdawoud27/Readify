const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User } = require("../models/User");
const {
  validateRegisterUser,
  validateLoginUser,
} = require("../utils/validators");

/**
 * @desc   Register new user
 * @route  /api/auth/register
 * @method POST
 * @access public
 */
const register = asyncHandler(async (req, res) => {
  const { error } = validateRegisterUser(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const username = await User.findOne({ username: req.body.username });
  const useremail = await User.findOne({ email: req.body.email });

  if (username || useremail) {
    return res
      .status(400)
      .json({ message: "This user is already exists - PLEASE LOGIN" });
  }

  // Check if the new username is already taken by another user
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser && existingUser._id.toString() !== req.params.id) {
    return res.status(400).json({ message: "Username already taken" });
  }

  // Encrept the password
  try {
    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);
  } catch (err) {
    return res.status(500).json({ message: "Error encrypting password" });
  }

  const newUser = await new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    orders: req.body.orders,
    reviews: req.body.reviews,
  });

  const createdUser = await newUser.save();
  const token = newUser.generateToken();

  const { password, ...others } = createdUser._doc;

  res.status(201).json({ ...others, token });
});

/**
 * @desc   Get register view
 * @route  /api/auth/register
 * @method GET
 * @access public
 */
const getRegisterView = asyncHandler(async (req, res) => {
  res.render("signup", { error: null });
});

/**
 * @desc   Login user
 * @route  /api/auth/login
 * @method POST
 * @access public
 */
const login = asyncHandler(async (req, res) => {
  const { error } = validateLoginUser(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // const username = await User.findOne({ username: req.body.username });
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!isPasswordMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  const token = user.generateToken();
  const { password, ...others } = user._doc;

  res.status(200).json({ ...others, token });
});

/**
 * @desc   Get login view
 * @route  /api/auth/login
 * @method GET
 * @access public
 */
const getLoginView = asyncHandler(async (req, res) => {
  res.render("login", { error: null });
});

module.exports = {
  register,
  login,
  getRegisterView,
  getLoginView,
};
