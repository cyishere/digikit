const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/order");
const { notAdmin } = require("../utils/validators");

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
      status: "New", // Shipped, Cancelled, Completed
    });

    const savedOrder = await newOrder.save();

    res.json({ orderId: savedOrder.id, message: "Purchase successfully!" });
  } catch (error) {
    next(error);
  }
});

// Get All Orders
router.get("/", async (req, res, next) => {
  try {
    notAdmin(req);
  } catch (error) {
    next(error);
  }
});

// Get Orders by User

module.exports = router;
