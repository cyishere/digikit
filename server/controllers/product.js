const router = require("express").Router();
const Category = require("../models/category");
const Product = require("../models/product");

/**
 * Post One
 */
router.post("/", async (req, res, next) => {
  const {
    title,
    price,
    description,
    brand,
    category,
    countInStock,
    images,
  } = req.body;
  try {
    if (
      title.trim() === "" ||
      description.trim() === "" ||
      price.toString().trim() === "" ||
      brand.trim() === "" ||
      images.length === 0
    ) {
      const error = new Error("Content cannot be empty...");
      error.statusCode = 400;
      throw error;
    }

    const categoryInDB = await Category.findOne({ _id: category });

    if (!categoryInDB) {
      const error = new Error("This category doesn't exist...");
      error.statusCode = 409;
      throw error;
    }

    if (+price < 0) {
      const error = new Error("Price must greater or equal to 0!");
      error.statusCode = 400;
      throw error;
    }

    const newProduct = new Product({
      title,
      description,
      price: +price,
      brand,
      category,
      countInStock,
      images,
      createdAt: new Date(),
    });

    await newProduct.save();

    res.json({ product: newProduct });
  } catch (error) {
    next(error);
  }
});

/**
 * Get ALL
 */
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({ products });
  } catch (error) {
    next(error);
  }
});

/**
 * Get ONE
 */
router.get("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      const error = new Error("Product not found.");
      error.statusCode = 404;
      throw error;
    }

    res.json({ product });
  } catch (error) {
    next(error);
  }
});

// TODO
// Update

/**
 * Delete ONE
 */
router.delete("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
      const error = new Error("Product not found.");
      error.statusCode = 404;
      throw error;
    }

    res.json({ message: "Delete successfully!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
