const router = require("express").Router();
const Category = require("../models/category");

/**
 * Create
 */
router.post("/", async (req, res, next) => {
  const { title } = req.body;
  try {
    if (title.trim() === "") {
      const error = new Error("Category cannot be empty!");
      error.statusCode = 400;
      throw error;
    }

    const existCategory = await Category.findOne({ title: title });

    if (existCategory) {
      const error = new Error("This category is already exist!");
      error.statusCode = 409;
      throw error;
    }

    const newCategory = new Category({ title });
    await newCategory.save();

    res.json({ category: newCategory });
  } catch (error) {
    return next(error);
  }
});

/**
 * Get ALL
 */
router.get("/", async (req, res, next) => {
  try {
    if (!req.userAdmin) {
      const error = new Error("403 Unauthorized");
      error.statusCode = 403;
      throw error;
    }

    const categories = await Category.find({});
    res.json({ categories });
  } catch (error) {
    next(error);
  }
});

/**
 * Get ONE
 */
router.get("/:id", async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);

    if (!category) {
      const error = new Error("Category not found.");
      error.statusCode = 404;
      throw error;
    }

    res.json({ category });
  } catch (error) {
    next(error);
  }
});

// TODO: 1) Update; 2) Delete.

module.exports = router;
