const jwt = require("jsonwebtoken");
const { SECRET, USER_ROLE_ADMIN } = require("../utils/config");
const {
  unAuthenticatedError,
  unAuthorizedError,
} = require("../utils/errorHelper");

/**
 * @feature Authenticate Token
 * @route   Middleware
 * @access  Private
 */
const userAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    unAuthenticatedError("You need to login.");
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    unAuthenticatedError("You need to login.");
  }

  const decodedToken = jwt.verify(token, SECRET);

  if (!decodedToken) {
    unAuthorizedError("Forbidden");
  }

  req.authenticated = true;
  req.user = decodedToken;
  next();
};

/**
 * @feature Authorize Admin
 * @route   Middleware
 * @access  Private
 */
const userAdmin = (req, res, next) => {
  if (req.user.role !== USER_ROLE_ADMIN) {
    unAuthorizedError("Not allowed");
  }

  next();
};

module.exports = { userAuth, userAdmin };
