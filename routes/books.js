const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  creatNewBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");

// /api/books/
router.route("/").get(getAllBooks).post(creatNewBook);

// /api/books/:id
router.route("/:id").get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;
