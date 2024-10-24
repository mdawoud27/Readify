const { Order } = require("../models/Order");
const { Review } = require("../models/Review");

const fetchUserReviews = async (users, fields) => {
  return await Promise.all(
    users.map(async (user) => {
      const reviews = await Review.find({ user: user._id }).select(fields);
      const orders = await Order.find({ user: user._id }).select(fields);

      return {
        ...user.toObject(),
        reviews,
        orders,
      };
    })
  );
};

module.exports = { fetchUserReviews };
