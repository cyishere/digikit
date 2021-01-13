const router = require("express").Router();
const User = require("../models/user");
const {
  validatorForBasicUserInfo,
  validatorForEmail,
  validatorForName,
} = require("../utils/validators");

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
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    }
    res.status(400).send("User Not Found");
  } catch (error) {
    console.log("Error at fetch one user: ", error.message);
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const { username, email } = req.body;
    const { errors, valid } = validatorForBasicUserInfo(username, email);

    if (valid) {
      const existUser = await User.findById(id);

      if (existUser) {
        // validate name
        const { nameError, nameValid } = await validatorForName(username, id);
        // validate email
        const { emailError, emailValid } = await validatorForEmail(email, id);

        if (nameValid && emailValid) {
          // save the update
          const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
          });
          return res.json(updatedUser);
        } else if (!nameValid) {
          errors.username = nameError;
        } else {
          errors.email = emailError;
        }

        res.json({ errors });
      } else {
        res.status(400).send("User Not Found");
      }
    } else {
      // errors in username or email
      res.json({ errors });
    }
  } catch (error) {
    console.log("Error at update: ", error.message);
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    if (deletedUser) {
      return res.json({
        userId: deletedUser.id,
        deleted: true,
      });
    }
    res.status(400).send("User Not Found");
  } catch (error) {
    console.log("Error at delete: ", error.message);
  }
});

module.exports = router;
