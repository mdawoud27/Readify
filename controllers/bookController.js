const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const { Book } = require("../models/Book");
const { setBookFields } = require("../utils/helpers");
const {
  validateCreateBook,
  validateUpdateBook,
} = require("../utils/validators");

/**
 *  @desc    Get all books
 *  @route   /api/books/
 *  @method  GET
 *  @access  public
 */
const getAllBooks = asyncHandler(async (req, res) => {
  const pageNumber = Number(req.query.pageNumber) || 1;
  const minPrice = Number(req.query.minPrice) || 0;
  const maxPrice = Number(req.query.maxPrice) || 100000000;

  if (pageNumber < 1) {
    return res.status(400).json({ message: "Invalid page number" });
  }

  const authorPerPage = 5;
  let books;

  if (minPrice && maxPrice) {
    books = await Book.find({
      price: { $gte: minPrice, $lte: maxPrice },
    })
      .populate("author", ["_id", "firstName", "lastName"])
      .sort({ title: 1 })
      .skip((pageNumber - 1) * authorPerPage)
      .limit(authorPerPage);
  } else {
    books = await Book.find()
      .populate("author", ["_id", "firstName", "lastName"])
      .sort({ title: 1 })
      .skip((pageNumber - 1) * authorPerPage)
      .limit(authorPerPage)
      .populate("author", ["_id", "firstName", "lastName"]);
  }
  res.status(200).json(books);
});

/**
 *  @desc    Get a book by id
 *  @route   /api/books/:id
 *  @method  GET
 *  @access  public
 */
const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id).populate("author", [
    "_id",
    "firstName",
    "lastName",
  ]);

  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({ mesaage: "This book is NOT FOUND!" });
  }
});

/**
 *  @desc    Create a new book
 *  @route   /api/books/
 *  @method  POST
 *  @access  private - ONLY ADMINS
 */
const creatNewBook = asyncHandler(async (req, res) => {
  const { error } = validateCreateBook(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const book = await new Book(setBookFields(req));

  const createdBook = await book.save();

  res.status(201).json(createdBook);
});

/**
 *  @desc    Update a book
 *  @route   /api/books/:id
 *  @method  PUT
 *  @access  private - ONLY ADMINS
 */
const updateBook = asyncHandler(async (req, res) => {
  const { error } = validateUpdateBook(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const book = await Book.findById(req.params.id);

  // title: req.body.title,
  // author: req.body.author,
  // description: req.body.description,
  // price: req.body.price,
  // cover: req.body.cover,
  // reviews: req.body.reviews,

  if (book) {
    const updateData = {
      ...(req.body.title && { title: req.body.title }), // Update if provided
      ...(req.body.author && { author: req.body.author }),
      ...(req.body.description && { description: req.body.description }),
      ...(req.body.price && { price: req.body.price }),
      ...(req.body.cover && { cover: req.body.cover }),
      ...(req.body.reviews && { reviews: req.body.reviews }),
    };

    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData,
      },
      { new: true }
    );

    res.status(200).json(updatedBook);
  } else {
    res.status(404).json({ message: "This book is NOT FOUND!" });
  }
});

/**
 *  @desc    Delete a book
 *  @route   /api/books/:id
 *  @method  DELETE
 *  @access  private - ONLY ADMINS
 */
const deleteBook = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);

  if (book) {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "This book is deleted successfully" });
  } else {
    res.status(404).json({ message: "This book is NOT FOUND!" });
  }
});

module.exports = {
  router,
  getAllBooks,
  getBookById,
  creatNewBook,
  updateBook,
  deleteBook,
};
