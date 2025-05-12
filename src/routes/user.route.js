const express = require("express");
const { updateUser } = require("../controllers/user.controller");
const userRoute = express.Router();

userRoute.put("/:userid/updateProfile", updateUser);

module.exports = userRoute;
