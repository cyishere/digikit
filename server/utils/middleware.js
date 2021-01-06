const logger = require("./logger");

/**
 * Request Logger
 */
const requestLogger = (req, res, next) => {
  logger.info("Method:", req.method);
  logger.info("Path:", req.path);
  logger.info("Body:", req.body);
  logger.info("---");
  next();
};

module.exports = { requestLogger };
