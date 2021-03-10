const router = require("express").Router();
const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");
const { notAdmin } = require("../utils/validators");

/**
 * Post One
 */
router.post("/", async (req, res, next) => {
  try {
    notAdmin(req);

    const {
      title,
      price,
      description,
      brand,
      category,
      countInStock,
      imageUrl,
    } = req.body;

    if (
      title.trim() === "" ||
      description.trim() === "" ||
      price.toString().trim() === "" ||
      brand.trim() === "" ||
      imageUrl.trim() === ""
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

    const owner = req.userId;

    const newProduct = new Product({
      title,
      description,
      price: +price,
      brand,
      category,
      countInStock: +countInStock,
      images: [imageUrl],
      owner,
      createdAt: new Date(),
    });

    const productSaved = await newProduct.save();

    // 1. add productId to user
    await User.findByIdAndUpdate(owner, {
      $push: { products: productSaved.id },
    });

    // 2. add productId to category
    await Category.findByIdAndUpdate(owner, {
      $push: { products: productSaved.id },
    });

    res.json({ product: newProduct, message: "Product is added!" });
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

    product._doc.id = product._doc._id;
    delete product._doc._id;
    delete product._doc.__v;

    const category = await Category.findById(product.category);

    res.json({
      product: {
        ...product._doc,
        category: category.title,
      },
    });
    // res.json({ product });
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
    notAdmin(req);

    const product = await Product.findByIdAndRemove(req.params.id);

    if (!product) {
      const error = new Error("Product not found.");
      error.statusCode = 404;
      throw error;
    }

    // 1. Remove from User
    await User.findByIdAndUpdate(product.owner, {
      $pull: { products: product.id },
    });

    // 2. Remove from Category
    await Category.findByIdAndUpdate(product.category, {
      $pull: { products: product.id },
    });

    res.json({ message: "Delete successfully!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
