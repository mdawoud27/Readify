const express = require("express");
const {
  getAllOrders,
  getOrderById,
  createNewOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

const router = express.Router();

// /api/orders/
router.route("/").get(getAllOrders).post(createNewOrder);

// /api/orders/:id
router.route("/:id").get(getOrderById).put(updateOrder).delete(deleteOrder);

module.exports = router;
