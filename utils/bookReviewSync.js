const { Review } = require("../models/Review");

const fetchBookReviews = async (books, fields) => {
  return await Promise.all(
    books.map(async (book) => {
      const reviews = await Review.find({ book: book._id })
        .populate("user", ["_id", "firstName", "lastName", "email"])
        .select(fields);

      return {
        ...book.toObject(),
        reviews: reviews || [],
      };
    })
  );
};

module.exports = { fetchBookReviews };
