const express = require("express");
const {
  getAllReviews,
  getReviewById,
  createNewReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const {
  verifyTokenAndAuthorization,
  verifyReviewAuthorization,
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
  .get(verifyReviewAuthorization, getReviewById)
  .put(verifyReviewAuthorization, updateReview)
  .delete(verifyReviewAuthorization, deleteReview);

module.exports = router;
