const asyncHandler = require("express-async-handler");
const {
  Author,
  validateCreateAuthor,
  validateUpdateAuthor,
} = require("../models/Author");

/**
 * @desc   Get all authors
 * @route  /api/authors/
 * @method GET
 * @access public
 */
const getAllAuthors = asyncHandler(async (req, res) => {
  const { pageNumber } = req.query;
  const authorPerPage = 5;
  const authors = await Author.find()
    .sort({ firstName: 1 })
    // .skip((pageNumber - 1) * authorPerPage)
    // .limit(authorPerPage);
  res.status(200).json(authors);
});

/**
 * @desc   Get author by id
 * @route  /api/authors/:id
 * @method GET
 * @access public
 */
const getAuthorById = asyncHandler(async (req, res) => {
  const author = await Author.findById(req.params.id);

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
    res.status(400).json({ error: error.details[0].message });
  }

  const author = new Author({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    biography: req.body.biography,
    books: req.body.books,
    nationality: req.body.nationality,
    image: req.body.image,
  });

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
    res.status(400).json({ error: error.details[0].message });
  }

  const author = await Author.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        biography: req.body.biography,
        books: req.body.books,
        nationality: req.body.nationality,
        image: req.body.image,
      },
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
