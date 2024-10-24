const express = require("express");
const {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
} = require("../middlewares/verifyToken");

const router = express.Router();

// /api/orders/
router
  .route("/")
  .get(verifyTokenAndAdmin, getAllOrders)
  .post(verifyTokenAndAuthorization, createNewOrder);

// /api/orders/:id
router
  .route("/:id")
  .get(verifyTokenAndAuthorization, getOrderById)
  .put(verifyTokenAndAuthorization, updateOrder)
  .delete(verifyTokenAndAuthorization, deleteOrder);

module.exports = router;
