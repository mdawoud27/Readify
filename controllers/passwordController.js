const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { validateChangePassword } = require("../utils/validators");
const { sendEmail } = require("../services/emailService");

/**
 * @desc   Get forgot password view
 * @route  /password/forget-password
 * @method GET
 * @access public
 */
const getForgotPasswordView = asyncHandler(async (req, res) => {
  res.render("forgot-password");
});

/**
 * @desc   Send forgot password link
 * @route  /password/forget-password
 * @method POST
 * @access public
 */
const sendForgotPasswordLink = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  // console.log(req.body.email);

  if (!user) {
    return res.status(404).json({ message: "User NOT FOUND!" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;
  const token = jwt.sign({ email: user.email, id: user.id }, secret, {
    expiresIn: "10m",
  });

  const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`;
  const emailHtml = `
    <div>
      <h4>Click on the link below to reset your password!</h4>
      <p>${link}</p>
    </div>`;

  try {
    await sendEmail({
      to: user.email,
      subject: "Reset Password",
      html: emailHtml,
    });

    res.render("link-send");
  } catch (error) {
    console.log(`send mail error: ${error.message}`);
    res.status(500).json({ message: "Something went wrong." });
  }
});

/**
 * @desc   Get reset password view
 * @route  /password/forget-password/:userId/:token
 * @method Get
 * @access public
 */
const getResetPasswordView = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(404).json({ message: "User NOT FOUND!" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;

  try {
    jwt.verify(req.params.token, secret);
    res.render("reset-password", { email: user.email });
  } catch (error) {
    console.log(`reset view error: ${error.message}`);
    res.json({ message: `reset view error: ${error.message}` });
  }
});

/**
 * @desc   Reset the password
 * @route  /password/forget-password/:userId/:token
 * @method POST
 * @access public
 */
const resetThePassword = asyncHandler(async (req, res) => {
  const { error } = validateChangePassword(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const user = await User.findById(req.params.userId);

  if (!user) {
    return res.status(404).json({ message: "User NOT FOUND!" });
  }

  const secret = process.env.JWT_SECRET_KEY + user.password;

  try {
    jwt.verify(req.params.token, secret);

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    user.password = req.body.password;
    await user.save();

    res.render("success-password");
  } catch (error) {
    console.log(`reset-error: ${error.message}`);
    res.json({ error: `reset-error: ${error.message}` });
  }
});

module.exports = {
  getForgotPasswordView,
  sendForgotPasswordLink,
  getResetPasswordView,
  resetThePassword,
};
