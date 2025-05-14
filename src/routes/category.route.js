const express = require("express");
const {
  getAllCategories,
  createNewCategory,
  updateExistingCategory,
  deleteCategoryById,
} = require("../controllers/category.controller");
const verifyAuth = require("../middlewares/verifyAuth");
const categoryRoute = express.Router();

categoryRoute.use(verifyAuth);
categoryRoute.get("/", getAllCategories);
categoryRoute.post("/addNewCategory", createNewCategory);
categoryRoute.put("/:categoryId/update", updateExistingCategory);
categoryRoute.delete("/:categoryId/delete", deleteCategoryById);

module.exports = categoryRoute;
