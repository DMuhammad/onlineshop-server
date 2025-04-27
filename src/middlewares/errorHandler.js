const { errorResponse } = require("../utils/responseFormatter");

function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const errors = err.errors || null;

  console.error("ErrorHandler: ", err);

  return errorResponse(res, message, errors, statusCode);
}

module.exports = errorHandler;
