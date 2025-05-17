const express = require("express");
const verifyAuth = require("../middlewares/verifyAuth");
const {
  getAllDiscounts,
  createNewVoucher,
  updateVoucher,
} = require("../controllers/discount.controller");
const discountRoute = express.Router();

discountRoute.use(verifyAuth);
discountRoute.get("/", getAllDiscounts);
discountRoute.post("/addNewDiscount", createNewVoucher);
discountRoute.put("/{id}/update", updateVoucher);

module.exports = discountRoute;
