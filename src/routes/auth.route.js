const express = require("express");
const {
  signIn,
  signUp,
  signOut,
  refreshToken,
  changePassword,
} = require("../controllers/auth.controller");
const verifyAuth = require("../middlewares/verifyAuth");
const verifyValidUser = require("../middlewares/verifyValidUser");

const authRoute = express.Router();

authRoute.post("/sign-in", signIn);
authRoute.post("/sign-up", signUp);
authRoute.post("/sign-out", verifyAuth, signOut);
authRoute.put(
  "/{:id}/changePassword",
  verifyAuth,
  verifyValidUser,
  changePassword
);
authRoute.get("/refreshToken", refreshToken);

module.exports = authRoute;
