const jwt = require("jsonwebtoken");
const User = require("../models/user");
const config = require("../utils/config");

const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

const validateName = async (nameTrimed, next) => {
  try {
    if (nameTrimed.length < 1 || nameTrimed.length > 20) {
      const error = new Error("Username'length must between 1 and 20.");
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
const isAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    req.authenticated = false;
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.authenticated = false;
    return next();
  }

  const decodedToken = jwt.verify(token, config.SECRET);

  if (!decodedToken) {
    req.authenticated = false;
    return next();
  }

  let admin = false;

  if (decodedToken.role === config.USER_STATUS) {
    admin = true;
  }

  req.authenticated = true;
  req.userId = decodedToken.id;
  req.userAdmin = admin;
  next();
};

const notAdmin = (req) => {
  if (!req.userAdmin) {
    const error = new Error("403 Unauthorized");
    error.statusCode = 403;
    throw error;
  }
};

module.exports = {
  isAuth,
  validateName,
  validateEmail,
  validatePassword,
  notAdmin,
};
