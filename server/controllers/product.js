const router = require("express").Router();
const Category = require("../models/category");
const Product = require("../models/product");
const User = require("../models/user");
const { userAuth, userAdmin } = require("../utils/auth");
const { badRequestError, notFoundError } = require("../utils/errorHelper");

/**
 * @feature Add a product
 * @route   POST /api/product
 * @access  Private (admin only)
 */
router.post("/", userAuth, userAdmin, async (req, res, next) => {
  try {
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
      badRequestError("Content cannot be empty...");
    }

    const categoryInDB = await Category.findOne({ _id: category });

    if (!categoryInDB) {
      badRequestError("This category doesn't exist...");
    }

    if (+price < 0) {
      badRequestError("Price must greater or equal to 0!");
    }

    const owner = req.user.id;

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
    await Category.findByIdAndUpdate(category, {
      $push: { products: productSaved.id },
    });

    res.json({ product: newProduct, message: "Product is added!" });
  } catch (error) {
    next(error);
  }
});

/**
 * @feature Get all products
 * @route   GET /api/product
 * @access  Public
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
 * @feature Get a product
 * @route   GET /api/product/:id
 * @access  Public
 */
router.get("/:id", async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      notFoundError("Product not found.");
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
/**
 * @feature Update a product
 * @route   PUT /api/product/:id
 * @access  Private (admin only)
 */
router.put("/:id", userAuth, userAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;

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
      imageUrl.trim() === "" ||
      countInStock.toString().trim() === ""
    ) {
      badRequestError("Content cannot be empty...");
    }

    // find the product
    const originalProduct = await Product.findById(id);

    if (!originalProduct) {
      notFoundError("Product not found.");
    }

    // whether is the same category
    if (originalProduct.category !== category) {
      const categoryInDB = await Category.findOne({ _id: category });

      if (!categoryInDB) {
        badRequestError("This category doesn't exist...");
      }

      // remove product id from the old category
      await Category.findByIdAndUpdate(originalProduct.category, {
        $pull: { products: id },
      });

      // add the product id to the new category
      await Category.findByIdAndUpdate(category, { $push: { products: id } });
    }

    const newProductInfo = {
      title,
      description,
      price: +price,
      brand,
      category,
      countInStock: +countInStock,
    };

    // whether the picture is the same one
    if (originalProduct.images[0] !== imageUrl) {
      await Product.findByIdAndUpdate(id, {
        $pull: { images: originalProduct.images[0] },
      });

      await Product.findByIdAndUpdate(id, { $push: { images: imageUrl } });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, newProductInfo, {
      new: true,
    });

    console.log({ product: updatedProduct, message: "Successfully updated!" });

    res.json({ product: updatedProduct, message: "Successfully updated!" });
  } catch (error) {
    next(error);
  }
});

/**
 * @feature Delete a product
 * @route   DELETE /api/product/:id
 * @access  Private (admin only)
 */
router.delete("/:id", userAuth, userAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByIdAndRemove(req.params.id);
    // console.log("deletedProduct", product);

    if (!product) {
      notFoundError("Product not found.");
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
