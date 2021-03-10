const router = require("express").Router();
const User = require("../models/user");
// const {
//   validatorForBasicUserInfo,
//   validatorForEmail,
//   validatorForName,
// } = require("../utils/validators");

// Get ALL
router.get("/", async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    console.log("Error at fetch all users: ", error.message);
  }
});

// Get ONE
router.get("/:id", async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      const error = new Error("User Not Found");
      error.statusCode = 400;
      throw error;
    }

    res.json(user);
  } catch (error) {
    next(error);
  }
});

// UPDATE
router.put("/:id", async (req, res, next) => {
  const id = req.params.id;
  try {
    // TODO Update One User
    await User.findById(id);
  } catch (error) {
    console.log("Error at update: ", error.message);
    next(error);
  }
});

// DELETE
router.delete("/:id", async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);

    if (!deletedUser) {
      const error = new Error("User Not Found");
      error.statusCode = 400;
      throw error;
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
