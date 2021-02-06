/**
 * Request Logger
 */
const requestLogger = (req, res, next) => {
  console.info("Method:", req.method);
  console.info("Path:", req.path);
  console.info("Body:", req.body);
  console.info("---");
  next();
};

/**
 * Error Handler
 */
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  next(
    res.status(statusCode).json({
      type: "error",
      message: err.message,
    })
  );
};

module.exports = { requestLogger, errorHandler };
