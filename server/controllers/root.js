const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { body, validationResult } = require("express-validator");
const User = require("../models/user");
const config = require("../utils/config");
const {
  validateUsername,
  validateEmail,
  validatePassword,
} = require("../utils/validators");

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
            role: user.role,
          };

          const token = jwt.sign(userForToken, config.SECRET);
          return res.json({
            username: user.username,
            token,
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
      console.error("error in login: ", error);
    }
  }
);

/**
 * @feature REGISTER
 */
router.post("/register", async (req, res, next) => {
  const { username, email, password, passconf } = req.body;

  const usernameTrimed = username.trim();
  const emailTrimed = email.trim();
  const passwordTrimed = password.trim();
  const passconfTrimed = passconf.trim();

  try {
    if (
      usernameTrimed === "" ||
      emailTrimed === "" ||
      passwordTrimed === "" ||
      passconfTrimed === ""
    ) {
      const error = new Error("Input cannot be empty.");
      error.statusCode = 400;
      throw error;
    }

    const usernameValid = await validateUsername(usernameTrimed, next);
    if (!usernameValid) return;

    const emailValid = await validateEmail(emailTrimed, next);
    if (!emailValid) return;

    const passwordValid = validatePassword(
      passwordTrimed,
      passconfTrimed,
      next
    );
    if (!passwordValid) return;

    const saltRounds = 12;
    const passwordHashed = await bcrypt.hash(passwordTrimed, saltRounds);

    const newUser = new User({
      username: usernameTrimed,
      email: emailTrimed,
      password: passwordHashed,
      createdAt: new Date(),
    });

    const savedUser = await newUser.save();

    res.json({ user: savedUser });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
