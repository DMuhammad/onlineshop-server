const express = require("express");
const { signIn, signUp, signOut } = require("../controllers/auth.controller");

const authRoute = express.Router();

authRoute.post("/sign-in", signIn);
authRoute.post("/sign-up", signUp);
authRoute.get("/sign-out", signOut);

module.exports = authRoute;
