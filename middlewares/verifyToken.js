const jwt = require("jsonwebtoken");
const { Order } = require("../models/Order");
const { Review } = require("../models/Review");

// Verify Token
function verifyToken(req, res, next) {
  const token = req.headers.token;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ message: "INVALID TOKEN!" });
    }
  } else {
    res.status(401).json({ message: "NO TOKEN PROVIDED!" });
  }
}

// Verify Token and Authorize the user
function verifyTokenAndAuthorization(req, res, next) {
  verifyToken(req, res, () => {
    // Convert IDs to strings for reliable comparison
    const userId = req.user.id?.toString();
    const paramsId = req.params.id?.toString();
    const bodyUserId = req.body.user?.toString();

    if (userId === paramsId || userId === bodyUserId || req.user.isAdmin) {
      next();
    } else {
      return res.status(403).json({ message: "You are not allowed!" });
    }
  });
}

// Verify Token and Admin
function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not allowed! - ONLY ADMINS." });
    }
  });
}

// Order authorization
function verifyOrderAuthorization(req, res, next) {
  verifyToken(req, res, async () => {
    try {
      // If user is admin, allow access immediately
      if (req.user.isAdmin) {
        return next();
      }

      // Get the order ID from params
      const orderId = req.params.id;

      // Find the order
      const order = await Order.findById(orderId);

      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      // Check if the logged-in user is the owner of the order
      if (order.user.toString() === req.user.id.toString()) {
        next();
      } else {
        return res.status(403).json({ message: "You are not allowed!" });
      }
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  });
}

// Verify Token For Review Authorization
function verifyReviewAuthorization(req, res, next) {
  verifyToken(req, res, async () => {
    try {
      // If user is admin, allow access immediately
      if (req.user.isAdmin) {
        return next();
      }

      const reviewId = req.params.id;
      const review = await Review.findById(reviewId);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      // Check if the logged-in user is the owner of the review
      if (review.user.toString() === req.user.id.toString()) {
        req.review = review;
        next();
      } else {
        return res.status(403).json({ message: "You are not allowed!" });
      }
    } catch (error) {
      console.error("Review authorization error:", error);
      return res.status(500).json({
        message: "Server error",
        details: error.message,
      });
    }
  });
}

module.exports = {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyOrderAuthorization,
  verifyReviewAuthorization,
};
