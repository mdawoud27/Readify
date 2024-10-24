const asyncHandler = require("express-async-handler");
const { Order } = require("../models/Order");
const { Book } = require("../models/Book");
const {
  validateCreateOrder,
  validateUpdateOrder,
} = require("../utils/validators");

/**
 * @decs   Get all orders
 * @route  /api/orders/
 * @method GET
 * @access private - ONLY ADMINS and USER HIMSELF
 */
const getAllOrders = asyncHandler(async (req, res) => {
  // TODO: add pagenation feature
  const orders = await Order.find()
    .populate("user", ["_id", "firstName", "lastName", "email"])
    .populate("book", ["_id", "title", "author", "price"])
    .select("-__v");
  res.status(200).json(orders);
});

/**
 * @decs   Get an order by id
 * @route  /api/orders/:id
 * @method GET
 * @access private - ONLY ADMINS and USER HIMSELF
 */
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", ["_id", "firstName", "lastName", "email"])
    .populate("book", ["_id", "title", "author", "price"])
    .select("-__v");
  if (order) {
    res.status(200).json(order);
  } else {
    res.status(404).json({ message: "Order NOT FOUND!" });
  }
});

/**
 * @decs   Create new order
 * @route  /api/orders/
 * @method POST
 * @access private - ONLY ADMINS and USER HIMSELF
 */
const createNewOrder = asyncHandler(async (req, res) => {
  const { error } = validateCreateOrder(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // Check if the user has already make an order
  const existsOrder = await Order.findOne({
    user: req.body.user,
    book: req.body.book,
  });

  if (existsOrder) {
    return res.status(400).json({ message: "This order already exists." });
  }

  const book = await Book.findById(req.body.book);

  if (!book) {
    return res.status(404).json({ message: "Book NOT FOUND!" });
  }

  const bookPrice = book.price;
  const expectedTotalPrice = bookPrice * req.body.quantity;

  if (req.body.totalPrice < expectedTotalPrice) {
    return res.status(400).json({
      message: `Total price should be at least ${expectedTotalPrice}`,
    });
  }

  const order = await new Order({
    quantity: req.body.quantity,
    totalPrice: req.body.totalPrice,
    user: req.body.user,
    book: req.body.book,
  });

  const cretedOrder = await order.save();

  res.status(201).json(cretedOrder);
});

/**
 * @decs   Update an order
 * @route  /api/orders/:id
 * @method PUT
 * @access private - ONLY ADMINS and USER HIMSELF
 */
const updateOrder = asyncHandler(async (req, res) => {
  const { error } = validateUpdateOrder(req.body);

  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  const order = await Order.findById(req.params.id);

  if (order) {
    const updateData = {
      ...(req.body.quantity && { quantity: req.body.quantity }),
      ...(req.body.totalPrice && { totalPrice: req.body.totalPrice }),
      ...(req.body.user && { user: req.body.user }),
      ...(req.body.book && { book: req.body.book }),
    };

    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: updateData,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } else {
    res.status(404).json({ message: "Order NOT FOUND!" });
  }
});

/**
 * @decs   Delete an order
 * @route  /api/orders/:id
 * @method DELETE
 * @access private - ONLY ADMINS and USER HIMSELF
 */
const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Order DELETED successfully." });
    return;
  } else {
    res.status(404).json({ message: "Order NOT FOUND!" });
  }
});

module.exports = {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateOrder,
  deleteOrder,
};
