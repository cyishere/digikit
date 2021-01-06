const router = require("express").Router();
const User = require("../models/users");
const { validatorForRegister } = require("../utils/validators");
const bcrypt = require("bcrypt");

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

// ADD new user or "Register"
router.post("/", async (req, res) => {
  try {
    const { username, email, password, passconf } = req.body;
    const { errors, valid } = validatorForRegister(
      username,
      email,
      password,
      passconf
    );

    if (valid) {
      const findUserByName = await User.findOne({ username });
      const findUserByEmail = await User.findOne({ email });

      if (findUserByName) {
        errors.username = "This username already be taken.";
      } else if (findUserByEmail) {
        errors.email = "This email already be used.";
      } else {
        // hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // make new user
        const newUser = new User({
          username,
          email,
          password: hashedPassword,
          createdAt: new Date(),
        });

        // save it
        const savedUser = await newUser.save();
        res.json(savedUser);
      }
      // return the errors when username or email be taken
      res.json({ errors });
    } else {
      // not valid
      res.json({ errors });
    }
  } catch (error) {
    console.log("Error at register: ", error.message);
  }
});

// UPDATE

// DELETE

module.exports = router;
