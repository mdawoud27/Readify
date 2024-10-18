const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
    },
    biography: { type: String, minlength: 5, maxlength: 500, trim: true },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }], // Reference to Book model
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    image: { type: String, trim: true, default: "default-avatar.png" },
  },
  { timestamps: true }
);

module.exports = {
  Author: mongoose.model("Author", authorSchema),
};
