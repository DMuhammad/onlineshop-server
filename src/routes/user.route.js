const express = require("express");
const { updateUser } = require("../controllers/user.controller");
const verifyAuth = require("../middlewares/verifyAuth");
const userRoute = express.Router();

userRoute.use(verifyAuth);
userRoute.put("/:userid/updateProfile", updateUser);

module.exports = userRoute;
