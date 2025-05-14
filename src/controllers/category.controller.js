const {
  validateCreateCategory,
  validateUpdateCategory,
} = require("../dtos/category.dto");
const CategoryService = require("../services/category.service");
const catchAsync = require("../utils/catchAsync");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");
const categoryService = new CategoryService();

const getAllCategories = catchAsync(async (req, res) => {
  const { error, result } = await categoryService.getCategories();

  return successResponse(res, "Successfully get all categories", result, 200);
});

const createNewCategory = catchAsync(async (req, res) => {
  const validated = validateCreateCategory(req.body);
  const { error, result } = await categoryService.addNewCategory(validated);

  if (error) {
    return errorResponse(res, result.message, result, result.code);
  }

  return successResponse(
    res,
    "Successfully created a new category",
    result,
    201
  );
});

const updateExistingCategory = catchAsync(async (req, res) => {
  const validated = validateUpdateCategory(req.body);
  const { error, result } = await categoryService.updateCategory(
    validated,
    req.params
  );

  return successResponse(res, "Successfully updated category", result, 201);
});

const deleteCategoryById = catchAsync(async (req, res) => {
  const result = await categoryService.deleteCategoryById(req.params);

  return successResponse(res, "Successfully deleted category");
});

module.exports = {
  getAllCategories,
  createNewCategory,
  updateExistingCategory,
  deleteCategoryById,
};
