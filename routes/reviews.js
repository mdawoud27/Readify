const express = require("express");
const {
  getAllReviews,
  getReviewById,
  createNewReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

const router = express.Router();

// /api/reviews/
router
  .route("/")
  .get(getAllReviews)
  .post(verifyTokenAndAuthorization, createNewReview);

// /api/reviews/:id
router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getReviewById)
  .put(verifyTokenAndAuthorization, updateReview)
  .delete(verifyTokenAndAuthorization, deleteReview);

module.exports = router;
