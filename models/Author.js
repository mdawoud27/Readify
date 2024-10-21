const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

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
    nationality: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },
    image: { type: String, trim: true, default: "default-avatar.png" },
    books: [{ type: mongoose.Schema.Types.ObjectId, ref: "Book" }], // Reference to Book model
  },
  { timestamps: true }
);

function validateCreateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().required().trim().min(3).max(20),
    lastName: Joi.string().required().trim().min(3).max(20),
    biography: Joi.string().trim().min(5).max(500),
    books: Joi.array().items(Joi.objectId()),
    nationality: Joi.string().required().trim().min(3).max(100),
    image: Joi.string().trim().default("default-avatar.png"),
  });
  return schema.validate(obj);
}

function validateUpdateAuthor(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(20),
    lastName: Joi.string().trim().min(3).max(20),
    biography: Joi.string().trim().min(5).max(500),
    books: Joi.array().items(Joi.objectId()),
    nationality: Joi.string().trim().min(3).max(100),
    image: Joi.string().trim().default("default-avatar.png"),
  });
  return schema.validate(obj);
}

module.exports = {
  Author: mongoose.model("Author", authorSchema),
  validateCreateAuthor,
  validateUpdateAuthor,
};
