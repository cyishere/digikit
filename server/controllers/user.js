const router = require("express").Router();
const User = require("../models/user");
const { userAuth, userAdmin } = require("../utils/auth");
const { USER_ROLE_ADMIN } = require("../utils/config");
const {
  unAuthorizedError,
  notFoundError,
  badRequestError,
} = require("../utils/errorHelper");

/**
 * @feature Get all users
 * @route   GET /api/user
 * @access  Private (admin only)
 */
router.get("/", userAuth, userAdmin, async (req, res, next) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.json({ users });
  } catch (error) {
    next(error);
  }
});

/**
 * @feature Fetch an user
 * @route   GET /api/user
 * @access  Private
 */
router.get("/:id", userAuth, async (req, res, next) => {
  console.log("req.user:", req.user);
  const currentUser = req.user;
  const userId = req.params.id;

  try {
    // check wheather is the user herself getting it
    if (currentUser.id.toString() !== userId.toString()) {
      if (currentUser.role !== USER_ROLE_ADMIN) {
        unAuthorizedError("Not Allowed");
      }
    }

    const user = await User.findById(userId);

    if (!user) {
      notFoundError("User Not Found");
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
});

/**
 * @feature Update an user
 * @route   PUT /api/user
 * @access  Private (owner only)
 */
router.put("/:id", userAuth, async (req, res, next) => {
  const id = req.params.id;
  try {
    if (req.user.id !== id) {
      unAuthorizedError("Not allowed");
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body);

    res.json({ user: updatedUser, message: "User information updated!" });
  } catch (error) {
    console.log("Error at update: ", error.message);
    next(error);
  }
});

/**
 * @feature Delete an user
 * @route   DELETE /api/user
 * @access  Private (admin only)
 */
router.delete("/:id", userAuth, userAdmin, async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);

    if (!deletedUser) {
      badRequestError("User Not Found");
    }

    return res.json({
      userId: deletedUser.id,
      deleted: true,
    });
  } catch (error) {
    console.log("Error at delete: ", error.message);
    next(error);
  }
});

module.exports = router;
