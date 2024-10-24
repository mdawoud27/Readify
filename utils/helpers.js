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

function setReviewFields(req) {
  return {
    ...(req.body.rating && { rating: req.body.rating }),
    ...(req.body.comment && { comment: req.body.comment }),
    user: req.body.user, // Keep the user and book as they are required fields.
    book: req.body.book,
  };
}

function setOrderFields(req) {
  return {
    ...(req.body.quantity && { quantity: req.body.quantity }),
    ...(req.body.totalPrice && { totalPrice: req.body.totalPrice }),
    user: req.body.user,
    book: req.body.book,
  };
}

module.exports = {
  setAuthorFields,
  setBookFields,
  setReviewFields,
  setOrderFields,
};
