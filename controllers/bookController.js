const express = require("express");
const asyncHandler = require("express-async-handler");
const router = express.Router();
const {
  Book,
  validateCreateBook,
  validateUpdateBook,
} = require("../models/Book");

/**
 *  @desc    Get all books
 *  @route   /api/books/
 *  @method  GET
 *  @access  public
 */
const getAllBooks = asyncHandler(async (req, res) => {
  const { pageNumber, minPrice, maxPrice } = req.query;
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
      .limit(authorPerPage);
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
    "biography",
    "nationality",
    "books",
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
    res.status(400).json({ error: error.details[0].message });
  }

  const book = await new Book({
    title: req.body.title,
    author: req.body.author,
    description: req.body.description,
    price: req.body.price,
    cover: req.body.cover,
    reviews: req.body.reviews,
  });

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
    res.status(400).json({ error: error.details[0].message });
  }

  const book = await Book.findById(req.params.id);

  if (book) {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          title: req.body.title,
          author: req.body.author,
          description: req.body.description,
          price: req.body.price,
          cover: req.body.cover,
          reviews: req.body.reviews,
        },
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
