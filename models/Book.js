const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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

// Validate Create Book
function validateCreateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().required().trim().min(3).max(200),
    author: Joi.objectId().required(),
    description: Joi.string().trim().required().min(5).max(500),
    price: Joi.number().min(0).required(),
    cover: Joi.string().required().valid("soft-cover", "hard-cover"),
    reviews: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(obj);
}

// Validate Update Book
function validateUpdateBook(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().min(3).max(200),
    author: Joi.objectId(),
    description: Joi.string().trim().min(5).max(500),
    price: Joi.number().min(0),
    cover: Joi.string().valid("soft-cover", "hard-cover"),
    reviews: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(obj);
}

module.exports = {
  Book: mongoose.model("Book", bookSchema),
  validateCreateBook,
  validateUpdateBook,
};
