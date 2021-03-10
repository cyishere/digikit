const router = require("express").Router();
const Category = require("../models/category");
const { notAdmin } = require("../utils/validators");

/**
 * Create
 */
router.post("/", async (req, res, next) => {
  try {
    notAdmin(req);

    const { title } = req.body;

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

    res.json({ category: newCategory, message: "Successfully add!" });
  } catch (error) {
    return next(error);
  }
});

/**
 * Get ALL
 */
router.get("/", async (req, res, next) => {
  try {
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

/**
 * Update One
 */
router.put("/:id", async (req, res, next) => {
  try {
    if (!req.userAdmin) {
      const error = new Error("403 Unauthorized");
      error.statusCode = 403;
      throw error;
    }

    const { title } = req.body;

    if (!title) {
      const error = new Error("Title cannot be empty.");
      error.statusCode = 400;
      throw error;
    }

    const exist = await Category.findById(req.params.id);

    if (!exist) {
      const error = new Error("Unvalid ID");
      error.statusCode = 400;
      throw error;
    }

    const existCategory = await Category.findOne({ title: title });

    if (existCategory) {
      const error = new Error("This category is already exist!");
      error.statusCode = 409;
      throw error;
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
});

/**
 * Delete One
 */
router.delete("/:id", async (req, res, next) => {
  try {
    notAdmin(req);

    const id = req.params.id;

    const category = await Category.findById(id);

    if (!category) {
      const error = new Error("Category not found.");
      error.statusCode = 404;
      throw error;
    }

    if (category.products.length > 0) {
      const error = new Error("There are products in this category.");
      error.statusCode = 400;
      throw error;
    }

    await Category.findByIdAndRemove(id);

    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = router;
