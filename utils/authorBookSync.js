const { Author } = require("../models/Author");
const { Book } = require("../models/Book");
const { connectToMongoDB } = require("../config/db");
require("dotenv").config();

async function updateAuthorBooks() {
  connectToMongoDB();
  try {
    const books = await Book.find();

    // Using Promise.all to handle async operations within the loop
    const updatePromises = books.map(async (book) => {
      return await Author.findByIdAndUpdate(book.author, {
        $addToSet: { books: book._id },
      });
    });

    // Wait for all updates to complete
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

    // Loop through each book
    const removePromises = books.map(async (book) => {
      // Find all authors except the current one who might still have this book
      const oldAuthors = await Author.find({
        books: book._id,
        _id: { $ne: book.author },
      });

      // Remove the book from all old authors
      const updateOldAuthorsPromises = oldAuthors.map(async (oldAuthor) => {
        return await Author.findByIdAndUpdate(oldAuthor._id, {
          $pull: { books: book._id },
        });
      });

      // Wait for all updates to complete
      return Promise.all(updateOldAuthorsPromises);
    });

    // Wait for all authors to be updated
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
