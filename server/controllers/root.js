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
const { badRequestError } = require("../utils/errorHelper");

/**
 * @feature API ROOT ENTRY
 */
router.get("/", (req, res) => {
  res.json({ message: "Hello Voyager!" });
});

/**
 * @feature LOGIN
 * @route   POST /api/login
 * @access  Pulic
 */
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;
  const emailTrimed = email.trim();
  const passwordTrimed = password.trim();

  try {
    if (emailTrimed === "" || passwordTrimed === "") {
      badRequestError("Input cannot be empty.");
    }

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      badRequestError("This email haven't registered.");
    }

    const isEqual = await bcrypt.compare(passwordTrimed, foundUser.password);

    if (!isEqual) {
      badRequestError("Password is wrong.");
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
 * @route   POST /api/register
 * @access  Public
 */
router.post("/register", async (req, res, next) => {
  const { name, email, password, passconf } = req.body;

  const nameTrimed = name.trim();
  const emailTrimed = email.trim();
  const passwordTrimed = password.trim();
  const passconfTrimed = passconf.trim();

  try {
    if (
      nameTrimed === "" ||
      emailTrimed === "" ||
      passwordTrimed === "" ||
      passconfTrimed === ""
    ) {
      badRequestError("Input cannot be empty.");
    }

    const firstNameValid = await validateName(nameTrimed, next);
    if (!firstNameValid) return;

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
      name: nameTrimed,
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
