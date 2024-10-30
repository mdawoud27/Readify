const asyncHandler = require("express-async-handler");
const { Review } = require("../models/Review");
const { Book } = require("../models/Book");
const {
  validateCreateReview,
  validateUpdateReview,
} = require("../utils/validators");
const { setReviewFields } = require("../utils/helpers");

/**
 * @desc    Get all reviews
 * @route  /api/reviews/
 * @method GET
 * @access public
 */
const getAllReviews = asyncHandler(async (req, res) => {
  const pageNumber = Number(req.query.pageNumber) || 1;
  const minRate = Number(req.query.minRate) || 1;
  const maxRate = Number(req.query.maxRate) || 5;

  if (pageNumber < 1) {
    return res.status(400).json({ message: "Invalid page number" });
  }

  const reviewPerPage = 5;

  const query = {
    rating: { $gte: minRate, $lte: maxRate },
  };

  const reviews = await Review.find(query)
    .sort({ rating: 1 })
    .skip((pageNumber - 1) * reviewPerPage)
    .limit(reviewPerPage)
    .populate({
      path: "book",
      select: "_id title author",
      populate: {
        path: "author",
        select: "_id firstName lastName",
      },
    })
    .populate("user", ["_id", "firstName", "lastName", "email"])
    .select("-__v");

  const totalReviews = await Review.countDocuments(query);

  res.status(200).json({
    reviews,
    page: pageNumber,
    totalPages: Math.ceil(totalReviews / reviewPerPage),
    totalReviews,
  });
});

/**
 * @desc    Get a review by id
 * @route  /api/reviews/:id
 * @method GET
 * @access public
 */
const getReviewById = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id)
    .populate("book", ["_id", "title", "author"])
    .populate("user", ["_id", "firstName", "lastName", "email"])
    .select("-__v");

  if (review) {
    res.status(200).json(review);
  } else {
    res.status(404).json({ message: "Review NOT FOUND!" });
  }
});

/**
 * @desc    Create a new review
 * @route  /api/reviews/
 * @method POST
 * @access private - ONLY ADMINS and USER HIMSELF
 */
const createNewReview = asyncHandler(async (req, res) => {
  const { error } = validateCreateReview(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if the book exists first
  const book = await Book.findById(req.body.book);
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  // Check if the user has already reviewed this book
  const existsReview = await Review.findOne({
    user: req.body.user,
    book: req.body.book,
  });

  if (existsReview) {
    return res
      .status(400)
      .json({ message: "You have already reviwed this book!" });
  }

  // Create the review
  const review = await new Review(setReviewFields(req));
  const createdReview = await review.save();

  // Update the book's reviews array
  await Book.findByIdAndUpdate(req.body.book, {
    $addToSet: { reviews: createdReview._id },
  });

  // Fetch the complete review with populated fields
  const populatedReview = await Review.findById(createdReview._id)
    .populate("book", ["_id", "title", "author"])
    .populate("user", ["_id", "firstName", "lastName", "email"])
    .select("-__v");

  res.status(201).json(populatedReview);
});

/**
 * @desc    Update a review
 * @route  /api/reviews/:id
 * @method PUT
 * @access private - ONLY ADMINS and USER HIMSELF
 */
const updateReview = asyncHandler(async (req, res) => {
  const { error } = validateUpdateReview(req.body);

  if (error) {
    res.status(400).json({ error: error.details[0].error });
  }

  const review = await Review.findById(req.params.id);

  if (review) {
    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      {
        $set: setReviewFields(req),
      },
      { new: true }
    )
      .populate("book", ["_id", "title", "author"])
      .populate("user", ["_id", "firstName", "lastName", "email"])
      .select("-__v");

    res.status(200).json(updatedReview);
  } else {
    res.status(404).json({ message: "Review NOT FOUND!" });
  }
});

/**
 * @desc    Delete a review
 * @route  /api/reviews/:id
 * @method DELETE
 * @access private - ONLY ADMINS and USER HIMSELF
 */
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (review) {
    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Review DELETED successfully" });
    return;
  } else {
    res.status(404).json({ message: "Review NOT FOUND!" });
  }
});

module.exports = {
  getAllReviews,
  getReviewById,
  createNewReview,
  updateReview,
  deleteReview,
};
