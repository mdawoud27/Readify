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

// Indexes for better query performance
reviewSchema.index({ rating: 1 });
reviewSchema.index({ book: 1 });
reviewSchema.index({ user: 1 });

module.exports = {
  Review: mongoose.model("Review", reviewSchema),
};
