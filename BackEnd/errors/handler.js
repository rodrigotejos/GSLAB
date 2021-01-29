const { ValidatorError } = require("yup");

var log4js = require("log4js");
var logger = log4js.getLogger();

logger.level = "debug";

const errorHandler = (error, request, response, next) => {
  if (error instanceof ValidatorError) {
    let errors = {};
    error.inner.forEach((element) => {
      errors[element.path] = element.error;
    });
    logger.debug("Verification error");
    return response.status(400).json({ message: "validation fails", errors });
  }
  logger.error(error);
  return response.status(500).json({ message: "internal server error" });
};

module.exports = errorHandler;
