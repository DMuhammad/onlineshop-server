const express = require("express");
const {
  signIn,
  signUp,
  signOut,
  refreshToken,
  changePassword,
} = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/sign-in", signIn);
authRoute.post("/sign-up", signUp);
authRoute.get("/sign-out", signOut);
authRoute.put("/{:id}/changePassword", changePassword);
authRoute.get("/refreshToken", refreshToken);

module.exports = authRoute;
