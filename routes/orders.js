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
  verifyOrderAuthorization,
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
  .get(verifyOrderAuthorization, getOrderById)
  .put(verifyOrderAuthorization, updateOrder)
  .delete(verifyOrderAuthorization, deleteOrder);

module.exports = router;
