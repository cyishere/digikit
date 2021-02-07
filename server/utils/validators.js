const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../utils/config");

const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

const validateUsername = async (usernameTrimed, next) => {
  try {
    if (usernameTrimed.length < 2 || usernameTrimed.length > 20) {
      const error = new Error("Username'length must between 2 and 20.");
      error.statusCode = 400;
      throw error;
    }

    const foundUser = await User.findOne({ username: usernameTrimed });

    if (foundUser) {
      const error = new Error("This username is already taken.");
      error.statusCode = 400;
      throw error;
    }

    return true;
  } catch (error) {
    next(error);
  }
};

const validateEmail = async (emailTrimed, next) => {
  try {
    if (!emailTrimed.match(regEx)) {
      const error = new Error("Email must be a valid email address.");
      error.statusCode = 400;
      throw error;
    }

    const foundUser = await User.findOne({ email: emailTrimed });

    if (foundUser) {
      const error = new Error("This email is already taken.");
      error.statusCode = 400;
      throw error;
    }

    return true;
  } catch (error) {
    next(error);
  }
};

const validatePassword = (passwordTrimed, passconfTrimed, next) => {
  try {
    if (passwordTrimed.length < 3 || passwordTrimed.length > 30) {
      const error = new Error("Password's length must between 3 and 30.");
      error.statusCode = 400;
      throw error;
    }

    if (passwordTrimed !== passconfTrimed) {
      const error = new Error("Passwords must match.");
      error.statusCode = 400;
      throw error;
    }

    return true;
  } catch (error) {
    next(error);
  }
};

const validatorForBasicUserInfo = (username, email) => {
  const errors = {};

  if (username.trim() === "") {
    errors.username = "Username must not be empty.";
  }

  if (email.trim() === "") {
    errors.email = "Email must not be empty.";
  } else {
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address.";
    }
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

// validate name
const validatorForName = async (username, id) => {
  let nameError = "";
  const user = await User.findOne({ username });

  if (user) {
    if (user._id.toString() !== id) {
      nameError = "This username is taken.";
    }
  }

  return {
    nameError,
    nameValid: nameError === "" ? true : false,
  };
};

// validate email
const validatorForEmail = async (email, id) => {
  let emailError = "";
  const user = await User.findOne({ email });

  if (user) {
    if (user._id.toString() !== id) {
      emailError = "This email is taken.";
    }
  }

  return {
    emailError,
    emailValid: emailError === "" ? true : false,
  };
};

/**
 * Authenticate Token
 */
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token === null) return res.sendStatus(401);

  jwt.verify(token, config.USER_STATUS, (err, userInfoInToken) => {
    if (err) return res.sendStatus(403);
    req.userInfoInToken = userInfoInToken;
    next();
  });
};

module.exports = {
  validatorForBasicUserInfo,
  validatorForEmail,
  validatorForName,
  authenticateToken,
  validateUsername,
  validateEmail,
  validatePassword,
};
