const { Review } = require("../models/Review");

// Fetch and populate reviews for each user
const fetchUserReviews = async (users, fields) => {
  return await Promise.all(
    users.map(async (user) => {
      const reviews = await Review.find({ user: user._id }).select(fields);

      return {
        ...user.toObject(),
        reviews,
      };
    })
  );
};

module.exports = { fetchUserReviews };
