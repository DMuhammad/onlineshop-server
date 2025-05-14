const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseFormatter");
require("dotenv").config();

const verifyAuth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return errorResponse(res, "Authorization token is required");
  }

  const token = authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    next();
  } catch (error) {
    return errorResponse(res, "Request is not authorized", error);
  }
};

module.exports = verifyAuth;
