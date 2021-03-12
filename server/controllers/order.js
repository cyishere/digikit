const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/order");

// Create One
router.post("/", async (req, res, next) => {
  try {
    if (!req.authenticated) {
      const error = new Error("Please login.");
      error.statusCode = 403;
      throw error;
    }

    const newOrder = new Order({
      number: uuidv4(),
      createdAt: new Date(),
      customer: req.userId,
      products: req.body.products,
      value: req.body.value,
      status: "New", // Shipped, Cancelled, Completed
    });

    const savedOrder = await newOrder.save();

    res.json({ orderId: savedOrder.id, message: "Purchase successfully!" });
  } catch (error) {
    next(error);
  }
});

// Get All Orders & Get Orders by User
router.get("/", async (req, res, next) => {
  try {
    if (!req.authenticated) {
      const error = new Error("Please login.");
      error.statusCode = 403;
      throw error;
    }

    let orders = null;

    if (req.userAdmin) {
      // get all
      orders = await Order.find();
    } else {
      // get orders by user
      orders = await Order.find({ customer: req.userId });
    }

    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
