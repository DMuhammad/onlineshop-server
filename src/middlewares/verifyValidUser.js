const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseFormatter");
require("dotenv").config();

const verifyValidUser = (req, res, next) => {
  const { authorization } = req.headers;
  const { id } = req.params;

  const token = authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  console.log(decoded);
  console.log(id);

  if (decoded.id != id) {
    return errorResponse(res, "Can't proceed your request. Invalid token");
  }

  next();
};

module.exports = verifyValidUser;
