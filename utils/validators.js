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
    // username: Joi.string().trim().min(3).max(20),
    password: Joi.string().required(),
  })
  //.xor("email", "username"); // Ensures that only one of email or username is required

  return schema.validate(obj);
}

// Validate change password
function validateChangePassword(obj) {
  const schema = Joi.object({
    password: Joi.string().trim().min(8).required(),
  });

  return schema.validate(obj);
}

// Validate Review creation
function validateCreateReview(obj) {
  const schema = Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().min(6).max(500).trim(),
    user: Joi.objectId().required(),
    book: Joi.objectId().required(),
  });

  return schema.validate(obj);
}

// Validate Review Update
function validateUpdateReview(obj) {
  const schema = Joi.object({
    rating: Joi.number().min(1).max(5),
    comment: Joi.string().min(6).max(500).trim(),
    user: Joi.objectId(),
    book: Joi.objectId(),
  });

  return schema.validate(obj);
}

// Validate Create Order
function validateCreateOrder(obj) {
  const schema = Joi.object({
    quantity: Joi.number().min(0).required(),
    totalPrice: Joi.number().min(0).required(),
    user: Joi.objectId().required(),
    book: Joi.objectId().required(),
  });

  return schema.validate(obj);
}

// Validate Update Order
function validateUpdateOrder(obj) {
  const schema = Joi.object({
    quantity: Joi.number().min(0),
    totalPrice: Joi.number().min(0),
    user: Joi.objectId(),
    book: Joi.objectId(),
  });

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
  validateChangePassword,
  validateCreateReview,
  validateUpdateReview,
  validateCreateOrder,
  validateUpdateOrder,
};
