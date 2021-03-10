const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../utils/config");
const {
  validateName,
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
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const emailTrimed = email.trim();
  const passwordTrimed = password.trim();

  try {
    if (emailTrimed === "" || passwordTrimed === "") {
      const error = new Error("Input cannot be empty.");
      error.statusCode = 400;
      throw error;
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      const error = new Error("This email haven't registered.");
      error.statusCode = 400;
      throw error;
    }

    const isEqual = await bcrypt.compare(passwordTrimed, foundUser.password);

    if (!isEqual) {
      const error = new Error("Password is wrong.");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign(
      {
        id: foundUser._id.toString(),
        email: emailTrimed,
        role: foundUser.role,
      },
      config.SECRET
    );

    res.json({ userId: foundUser._id.toString(), token });
  } catch (error) {
    console.log({ error });
    next(error);
  }
});

/**
 * @feature REGISTER
 */
router.post("/register", async (req, res, next) => {
  const { firstName, lastName, email, password, passconf } = req.body;

  const firstNameTrimed = firstName.trim();
  const lastNameTrimed = lastName.trim();
  const emailTrimed = email.trim();
  const passwordTrimed = password.trim();
  const passconfTrimed = passconf.trim();

  try {
    if (
      firstNameTrimed === "" ||
      emailTrimed === "" ||
      passwordTrimed === "" ||
      passconfTrimed === ""
    ) {
      const error = new Error("Input cannot be empty.");
      error.statusCode = 400;
      throw error;
    }

    const firstNameValid = await validateName(firstNameTrimed, next);
    if (!firstNameValid) return;

    const lastNameValid = await validateName(lastNameTrimed, next);
    if (!lastNameValid) return;

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
      firstName: firstNameTrimed,
      lastName: lastNameTrimed,
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

/**
 * @feature ADMIN ACCESS AUTH
 */
router.get("/auth", async (req, res, next) => {
  try {
    if (!req.userAdmin) {
      const error = new Error("403 Unauthorized");
      error.statusCode = 403;
      throw error;
    }
    res.json({ message: "accessed" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
