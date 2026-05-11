const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  duration: Number,
  totalPrice: Number,
  deliveryDate: String
});

module.exports = mongoose.model("Order", orderSchema);