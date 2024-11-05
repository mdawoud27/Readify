const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const { validateUpdateUser } = require("../utils/validators");
const { fetchUserReviews } = require("../utils/userReviewOrderSync");
/**
 *  @desc    Get All Users
 *  @route   /api/users
 *  @method  GET
 *  @access  private - ONLY ADMINS
 */
const getAllUsers = asyncHandler(async (req, res) => {
  const pageNumber = Number(req.query.pageNumber) || 1;

  if (pageNumber < 1) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid page number" });
  }

  const userPerPage = 10;
  const users = await User.find()
    .select(["-password", "-__v"])
    .sort({ firstName: 1 })
    .skip((pageNumber - 1) * userPerPage)
    .limit(userPerPage);

  // Define which fields you want to include or exclude from the reviews
  const reviewFields = "rating comment book";

  // Fetch users with reviews and attach reviews with selected fields
  const usersWithReviews = await fetchUserReviews(users, reviewFields);
  res.status(200).json(usersWithReviews);
});

/**
 *  @desc    Get a user by id
 *  @route   /api/users/:id
 *  @method  GET
 *  @access  private - ONLY ADMINS and USER HIMSELF
 */
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)
    .select(["-password", "-__v"])
    .populate("reviews");

  if (user) {
    const reviewFields = "rating comment book";

    // Fetch users with reviews and attach reviews with selected fields
    const usersWithReviews = await fetchUserReviews([user], reviewFields);
    res.status(200).json(usersWithReviews);
  } else {
    res.status(404).json({ success: false, message: "User NOT FOUND!" });
  }
});

/**
 *  @desc    Update a user
 *  @route   /api/users/:id
 *  @method  PUT
 *  @access  private - ONLY ADMINS and USER HIMSELF
 */
const updateUser = asyncHandler(async (req, res) => {
  const { error } = validateUpdateUser(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if the new username is already taken by another user
  const existingUser = await User.findOne({ username: req.body.username });
  if (existingUser && existingUser._id.toString() !== req.params.id) {
    return res.status(400).json({ message: "Username already taken" });
  }

  const user = await User.findById(req.params.id);

  if (user) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          orders: req.body.orders,
          reviews: req.body.reviews,
        },
      },
      { new: true }
    ).select(["-password", "-isAdmin", "-__v"]);

    res.status(200).json(updatedUser);
  } else {
    res.status(404).json({ success: false, message: "User NOT FOUND!" });
  }
});

/**
 *  @desc    Delete a user
 *  @route   /api/users/:id
 *  @method  DELETE
 *  @access  private - ONLY ADMINS and USER HIMSELF
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "This user is successfully deleted!" });
    return;
  } else {
    res.status(404).json({ success: false, message: "User NOT FOUND!" });
  }
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
