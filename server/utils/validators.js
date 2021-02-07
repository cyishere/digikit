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
      // error.statusCode = 400;
      throw error;
    }

    if (passwordTrimed !== passconfTrimed) {
      const error = new Error("Passwords must match.");
      // error.statusCode = 400;
      throw error;
    }

    return true;
  } catch (error) {
    next(error);
  }
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
  authenticateToken,
  validateUsername,
  validateEmail,
  validatePassword,
};
