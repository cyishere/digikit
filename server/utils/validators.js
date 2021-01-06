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
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
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

module.exports = { validatorForRegister };
