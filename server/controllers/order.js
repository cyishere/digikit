const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/order");
const Product = require("../models/product");
const { notAdmin } = require("../utils/validators");

// Create One
router.post("/", async (req, res, next) => {
  try {
    if (!req.authenticated) {
      const error = new Error("Please login.");
      error.statusCode = 403;
      throw error;
    }

    const products = req.body.products;

    const newOrder = new Order({
      number: uuidv4(),
      createdAt: new Date(),
      customer: req.userId,
      products,
      value: req.body.value,
      status: "New", // Shipped, Cancelled, Completed
    });

    const savedOrder = await newOrder.save();

    // TODO remove countInStock from products
    products.forEach(async (item) => {
      const product = await Product.findById(item.id);
      await Product.findByIdAndUpdate(item.id, {
        countInStock: product.countInStock - item.qty,
      });
    });

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

// Delete
router.delete("/:id", async (req, res, next) => {
  try {
    notAdmin(req);

    const deletedOrder = await Order.findByIdAndRemove(req.params.id);

    if (!deletedOrder) {
      const error = new Error("Order not found.");
      error.statusCode = 400;
      throw error;
    }

    res.json({ id: deletedOrder.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
