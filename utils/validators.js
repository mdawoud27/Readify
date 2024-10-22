const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const passwordComplexity = require("joi-password-complexity");

// Validate create an Author
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

// Validate update an Author
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

// Validate update user
function validateUpdateUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(20),
    lastName: Joi.string().trim().min(3).max(20),
    username: Joi.string().trim().min(3).max(20),
    email: Joi.string().email().trim().min(5).max(100),
    password: Joi.string().trim().min(8).max(100),
  });

  return schema.validate(obj);
}

// Validate User regisration
function validateRegisterUser(obj) {
  const schema = Joi.object({
    firstName: Joi.string().trim().min(3).max(20).required(),
    lastName: Joi.string().trim().min(3).max(20).required(),
    username: Joi.string().required().trim().min(3).max(20),
    email: Joi.string().required().email().trim().min(5).max(100),
    password: passwordComplexity().required(),
    orders: Joi.array().items(Joi.objectId()),
    reviews: Joi.array().items(Joi.objectId()),
  });

  return schema.validate(obj);
}

// Validate User login
function validateLoginUser(obj) {
  const schema = Joi.object({
    // Either email or username must be provided
    email: Joi.string().email().trim().min(5).max(100),
    username: Joi.string().trim().min(3).max(20),

    // Require either username or email (at least one)
    password: Joi.string().required(),
  }).xor("email", "username"); // Ensures that only one of email or username is required

  return schema.validate(obj);
}

module.exports = {
  validateCreateAuthor,
  validateUpdateAuthor,
  validateCreateBook,
  validateUpdateBook,
  validateUpdateUser,
  validateRegisterUser,
  validateLoginUser,
};
