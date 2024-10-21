const express = require("express");
const router = express.Router();
const {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  updateAuthor,
  deleteAuthor,
} = require("../controllers/authorController");

// /api/authors/
router.route("/").get(getAllAuthors).post(createNewAuthor);

// /api/authors/:id
router.route("/:id").get(getAuthorById).put(updateAuthor).delete(deleteAuthor);

module.exports = router;
