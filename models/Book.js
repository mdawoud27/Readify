const { required } = require("joi");
const mongoose = require("mongoose");

const bookSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 200,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId, // Link to Author
      ref: "Author",
      required: true,
    },
    description: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
      maxlength: 500,
    },
    price: { type: Number, min: 0, required: true },
    cover: { type: String, required: true, enum: ["soft-cover", "hard-cover"] },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference to Review model
  },
  { timestamps: true }
);

module.exports = {
  Book: mongoose.model("Book", bookSchema),
};
