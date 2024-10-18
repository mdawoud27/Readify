const { required } = require("joi");
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, minlength: 6, maxlength: 500, trim: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to User
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  },
  { timestamps: true }
);

module.exports = {
  Review: mongoose.model("Review", reviewSchema),
};
