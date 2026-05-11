const express = require("express");
const router = express.Router();
const Order = require("../models/Order");

// Place Order
router.post("/place", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.send("✅ Order Placed");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get Orders
router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

// Get Orders by User
router.get("/user/:userId", async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });

    res.json({
      success: true,
      orders: orders
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

module.exports = router;