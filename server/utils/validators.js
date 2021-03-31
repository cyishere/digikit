const User = require("../models/user");
const { badRequestError } = require("./errorHelper");

const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

const validateName = async (nameTrimed, next) => {
  try {
    if (nameTrimed.length < 1 || nameTrimed.length > 20) {
      badRequestError("Username'length must between 1 and 20.");
    }

    return true;
  } catch (error) {
    next(error);
  }
};

const validateEmail = async (emailTrimed, next) => {
  try {
    if (!emailTrimed.match(regEx)) {
      badRequestError("Email must be a valid email address.");
    }

    const foundUser = await User.findOne({ email: emailTrimed });

    if (foundUser) {
      badRequestError("This email is already taken.");
    }

    return true;
  } catch (error) {
    next(error);
  }
};

const validatePassword = (passwordTrimed, passconfTrimed, next) => {
  try {
    if (passwordTrimed.length < 3 || passwordTrimed.length > 30) {
      badRequestError("Password's length must between 3 and 30.");
    }

    if (passwordTrimed !== passconfTrimed) {
      badRequestError("Passwords must match.");
    }

    return true;
  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateName,
  validateEmail,
  validatePassword,
};
