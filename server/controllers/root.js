const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const logger = require("../utils/logger");
const config = require("../utils/config");
const { validatorForRegister } = require("../utils/validators");

/**
 * @feature API ROOT ENTRY
 */
router.get("/", (req, res) => {
  res.json({ message: "Hello Voyager!" });
});

/**
 * @feature LOGIN
 */
router.post(
  "/login",
  [
    body("username").not().isEmpty().trim(),
    body("password").not().isEmpty().trim(),
  ],
  async (req, res) => {
    const errors = {};
    const validationErr = validationResult(req);

    // when un valid
    if (!validationErr.isEmpty()) {
      errors.message = "Username and password must not be empty.";
      return res.json({ errors });
    }

    // valid
    try {
      const { username, password } = req.body;

      const user = await User.findOne({ username });

      if (user) {
        const passwordCorrect = await bcrypt.compare(password, user.password);

        if (passwordCorrect) {
          const userForToken = {
            username: user.username,
            id: user.id,
            role: user.role === "ADMIN" ? "admin" : "user",
          };

          const token = jwt.sign(userForToken, config.SECRET);
          return res.json({
            username: user.username,
            token,
            owner: user.role === "ADMIN" ? true : false,
          });
        }

        // when password wrong
        errors.password = "Wrong password";
      } else {
        // when username wrong
        errors.username = "There's no this user.";
      }
      // 401
      res.json({ errors });
    } catch (error) {
      logger.error("error in login: ", error);
    }
  }
);

/**
 * @feature REGISTER
 */
router.post("/register", async (req, res) => {
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

module.exports = router;
