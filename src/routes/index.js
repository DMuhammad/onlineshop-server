const express = require("express");
const authRoute = require("./auth.route");
const userRoute = require("./user.route");
const categoryRoute = require("./category.route");
const discountRoute = require("./discount.route");

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/category", categoryRoute);
router.use("/discount", discountRoute);

module.exports = router;
