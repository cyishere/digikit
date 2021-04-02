const router = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const Order = require("../models/order");
const Product = require("../models/product");
const { userAuth } = require("../utils/auth");
const { USER_ROLE_ADMIN } = require("../utils/config");
const { unAuthorizedError, notFoundError } = require("../utils/errorHelper");

/**
 * @feature Create an order
 * @route   POST /api/order
 * @access  Private
 */
router.post("/", userAuth, async (req, res, next) => {
  try {
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

/**
 * @feature Get All Orders & Get Orders by User
 * @route   GET /api/order
 * @access  Private
 */
router.get("/", userAuth, async (req, res, next) => {
  try {
    let orders = [];

    if (req.user.role === USER_ROLE_ADMIN) {
      // get all
      orders = await Order.find();
    } else {
      // get orders by user
      orders = await Order.find({ customer: req.user.id });
    }

    res.json({ orders });
  } catch (error) {
    next(error);
  }
});

/**
 * @feature Delete an order
 * @route   DELETE /api/order/:id
 * @access  Private (user only)
 */
router.delete("/:id", userAuth, async (req, res, next) => {
  try {
    // find the order
    const order = await Order.findById(req.params.id);

    if (!order) {
      notFoundError("Order not found.");
    }

    if (order.customer !== req.user.id) {
      unAuthorizedError("Not allowed");
    }

    await Order.findByIdAndRemove(req.params.id);

    res.json({ id: order.id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
