const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    quantity: { type: Number, min: 0, required: true },
    totalPrice: { type: Number, min: 0, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  },
  { timestamps: true }
);

module.exports = {
  Order: mongoose.model("Order", orderSchema),
};
