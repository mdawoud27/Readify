const setAuthorFields = (req) => ({
  firstName: req.body.firstName,
  lastName: req.body.lastName,
  biography: req.body.biography,
  books: req.body.books,
  nationality: req.body.nationality,
  image: req.body.image,
});

const setBookFields = (req) => ({
  title: req.body.title,
  author: req.body.author,
  description: req.body.description,
  price: req.body.price,
  cover: req.body.cover,
  reviews: req.body.reviews,
});

module.exports = {
  setAuthorFields,
  setBookFields,
};
