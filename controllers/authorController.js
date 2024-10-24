const asyncHandler = require("express-async-handler");
const { Author } = require("../models/Author");
const { setAuthorFields } = require("../utils/helpers");
const {
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../utils/validators");

/**
 * @desc   Get all authors
 * @route  /api/authors/
 * @method GET
 * @access public
 */
const getAllAuthors = asyncHandler(async (req, res) => {
  const pageNumber = Number(req.query.pageNumber) || 1;

  if (pageNumber < 1) {
    return res.status(400).json({ message: "Invalid page number" });
  }

  const authorPerPage = 5;
  const authors = await Author.find()
    .sort({ firstName: -1 })
    .skip((pageNumber - 1) * authorPerPage)
    .limit(authorPerPage)
    .populate("books", ["_id", "title"])
    .select("-__v");
  res.status(200).json(authors);
});

/**
 * @desc   Get author by id
 * @route  /api/authors/:id
 * @method GET
 * @access public
 */
const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id)
    .populate("books", ["_id", "title"])
    .select("-__v");

  if (author) {
    res.status(200).json(author);
  } else {
    res.status(404).json({ message: "This author is NOT FOUND!" });
  }
});

/**
 * @desc   Create new author
 * @route  /api/authors/
 * @method POST
 * @access private - ONLY ADMINS
 */
const createNewAuthor = asyncHandler(async (req, res) => {
  const { error } = validateCreateAuthor(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const author = new Author(setAuthorFields(req));

  const authorSaved = await author.save();
  res.status(201).json(authorSaved);
});

/**
 * @desc   Update an author
 * @route  /api/authors/:id
 * @method PUT
 * @access private - ONLY ADMINS
 */
const updateAuthor = asyncHandler(async (req, res) => {
  const { error } = validateUpdateAuthor(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const updateData = {
    ...(req.body.firstName && { firstName: req.body.firstName }), // Update if provided
    ...(req.body.lastName && { lastName: req.body.lastName }),
    ...(req.body.biography && { biography: req.body.biography }),
    ...(req.body.books && { books: req.body.books }),
    ...(req.body.nationality && { nationality: req.body.nationality }),
    ...(req.body.image && { image: req.body.image }),
  };

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: updateData,
    },
    { new: true }
  );

  res.status(200).json(author);
});

/**
 * @desc   Delete an author
 * @route  /api/authors/:id
 * @method DELETE
 * @access private - ONLY ADMINS
 */
const deleteAuthor = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);

  if (author) {
    await Author.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "This author is DELETED successfully." });
    return;
  } else {
    res.status(404).json({ error: "This author is NOT FOUND!" });
  }
});

module.exports = {
  getAllAuthors,
  getAuthorById,
  createNewAuthor,
  updateAuthor,
  deleteAuthor,
};
