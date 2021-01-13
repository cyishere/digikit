const User = require("../models/user");

const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

const validatorForRegister = (username, email, password, passconf) => {
  const errors = {};

  // username
  if (username.trim() === "") {
    errors.username = "Username must not be empty.";
  }

  // email
  if (email.trim() === "") {
    errors.email = "Email must not be empty.";
  } else {
    if (!email.match(regEx)) {
      errors.email = "Email must be a valid email address.";
    }
  }

  // password
  if (password.trim() === "") {
    errors.password = "Password must not be empty.";
  } else if (passconf.trim() !== password.trim()) {
    errors.passconf = "Passwords must match.";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
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

module.exports = {
  validatorForBasicUserInfo,
  validatorForEmail,
  validatorForName,
  validatorForRegister,
};
