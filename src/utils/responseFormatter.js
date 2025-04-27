function successResponse(res, message, data = null, code = 200) {
  return res.status(code).json({
    status: "success",
    message,
    data,
  });
}

function errorResponse(res, message, errors = null, code = 400) {
  return res.status(code).json({
    status: "error",
    message,
    errors,
  });
}

module.exports = {
  successResponse,
  errorResponse,
};
