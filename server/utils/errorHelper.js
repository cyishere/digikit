const badRequestError = (message) => {
  const error = new Error(message);
  error.statusCode = 400;
  throw error;
};

const unAuthenticatedError = (message) => {
  const error = new Error(message);
  error.statusCode = 401;
  throw error;
};

const unAuthorizedError = (message) => {
  const error = new Error(message);
  error.statusCode = 403;
  throw error;
};

const notFoundError = (message) => {
  const error = new Error(message);
  error.statusCode = 404;
  throw error;
};

const conflictError = (message) => {
  const error = new Error(message);
  error.statusCode = 409;
  throw error;
};

module.exports = {
  badRequestError,
  unAuthenticatedError,
  unAuthorizedError,
  notFoundError,
  conflictError,
};
