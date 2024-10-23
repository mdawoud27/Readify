const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  creatNewBook,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// /api/books/
router.route("/").get(getAllBooks).post(verifyTokenAndAdmin, creatNewBook);

// /api/books/:id
router
  .route("/:id")
  .get(getBookById)
  .put(verifyTokenAndAdmin, updateBook)
  .delete(verifyTokenAndAdmin, deleteBook);

module.exports = router;
