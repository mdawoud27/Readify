const express = require("express");
const router = express.Router();
const {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// /api/authors/
router.route("/").get(getAllAuthors).post(verifyTokenAndAdmin, createNewAuthor);

// /api/authors/:id
router
  .route("/:id")
  .get(getAuthorById)
  .put(verifyTokenAndAdmin, updateAuthor)
  .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router;
