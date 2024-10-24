const { Author } = require("../models/Author");
const { Book } = require("../models/Book");
const { connectToMongoDB } = require("../config/db");
require("dotenv").config();

async function updateAuthorBooks() {
  connectToMongoDB();
  try {
    const books = await Book.find();

    const updatePromises = books.map(async (book) => {
      return await Author.findByIdAndUpdate(book.author, {
        $addToSet: { books: book._id },
      });
    });

    await Promise.all(updatePromises);
    console.log("Authors updated with corresponding books!");
  } catch (error) {
    console.error("Error updating authors:", error.message);
  }
}

async function removeBooksFromOldAuthors() {
  connectToMongoDB();
  try {
    const books = await Book.find();

    const removePromises = books.map(async (book) => {
      const oldAuthors = await Author.find({
        books: book._id,
        _id: { $ne: book.author },
      });

      const updateOldAuthorsPromises = oldAuthors.map(async (oldAuthor) => {
        return await Author.findByIdAndUpdate(oldAuthor._id, {
          $pull: { books: book._id },
        });
      });

      return Promise.all(updateOldAuthorsPromises);
    });

    await Promise.all(removePromises);

    console.log("Books removed from old authors successfully!");
  } catch (error) {
    console.error("Error removing books from old authors:", error.message);
  }
}

module.exports = {
  updateAuthorBooks,
  removeBooksFromOldAuthors,
};
