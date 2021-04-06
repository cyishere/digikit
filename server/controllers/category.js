const router = require("express").Router();
const Category = require("../models/category");
const { userAuth, userAdmin } = require("../utils/auth");
const {
  badRequestError,
  conflictError,
  notFoundError,
} = require("../utils/errorHelper");

/**
 * @feature Create a category
 * @route   POST /api/category
 * @access  Private (admin only)
 */
router.post("/", userAuth, userAdmin, async (req, res, next) => {
  try {
    const { title } = req.body;

    if (title.trim() === "") {
      badRequestError("Category cannot be empty!");
    }

    const existCategory = await Category.findOne({ title: title });

    if (existCategory) {
      conflictError("This category is already exist!");
    }

    const newCategory = new Category({ title });
    await newCategory.save();

    res.json({ category: newCategory, message: "Successfully add!" });
  } catch (error) {
    next(error);
  }
});

/**
 * @feature Get all categories
 * @route   GET /api/category
 * @access  Public
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
 * @feature Get a category
 * @route   GET /api/category/:id
 * @access  Pulic
 */
router.get("/:id", async (req, res, next) => {
  try {
    const categoryId = req.params.id;

    const category = await Category.findById(categoryId);

    if (!category) {
      notFoundError("Category not found.");
    }

    res.json({ category });
  } catch (error) {
    next(error);
  }
});

/**
 * @feature Update a category
 * @route   PUT /api/category
 * @access  Private (admin only)
 */
router.put("/:id", userAuth, userAdmin, async (req, res, next) => {
  try {
    const { title } = req.body;

    if (!title) {
      notFoundError("Title cannot be empty.");
    }

    const exist = await Category.findById(req.params.id);

    if (!exist) {
      notFoundError("Unvalid ID");
    }

    const existCategory = await Category.findOne({ title: title });

    if (existCategory) {
      conflictError("This category is already exist!");
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      { title },
      { new: true }
    );

    res.json({ category: updatedCategory, message: "Successfully updated!" });
  } catch (error) {
    next(error);
  }
});

/**
 * @feature Delete a category
 * @route   DELETE /api/category
 * @access  Private (admin only)
 */
router.delete("/:id", userAuth, userAdmin, async (req, res, next) => {
  try {
    const id = req.params.id;

    const category = await Category.findById(id);

    if (!category) {
      notFoundError("Category not found.");
    }

    if (category.products.length > 0) {
      badRequestError("There are products in this category.");
    }

    await Category.findByIdAndRemove(id);

    res.json({ categoryId: id, message: "Successfully deleted!" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
