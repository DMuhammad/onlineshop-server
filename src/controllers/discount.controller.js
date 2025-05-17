const {
  validateAddDiscount,
  validateUpdateDiscountQuota,
} = require("../dtos/discount.dto");
const DiscountService = require("../services/discount.service");
const catchAsync = require("../utils/catchAsync");
const {
  errorResponse,
  successResponse,
} = require("../utils/responseFormatter");
const discountService = new DiscountService();

const getAllDiscounts = catchAsync(async (req, res) => {
  const result = await discountService.getAll();

  return successResponse(res, "Successfully get all discounts", result, 200);
});

const createNewVoucher = catchAsync(async (req, res) => {
  const validated = validateAddDiscount(req.body);
  const { error, result } = await discountService.addNewDiscount(validated);

  if (error) {
    return errorResponse(res, result.message, result, result.code);
  }

  return successResponse(
    res,
    "Successfully added a new discount voucher",
    result,
    201
  );
});

const updateVoucher = catchAsync(async (req, res) => {
  const validated = validateUpdateDiscountQuota(req.body);
  const { error, result } = await discountService.updateVoucher(
    validated,
    req.params
  );

  if (error) {
    return errorResponse(res, result.message, result, result.code);
  }

  return successResponse(
    res,
    "Successfully update quota of voucher",
    result,
    201
  );
});

module.exports = {
  getAllDiscounts,
  createNewVoucher,
  updateVoucher,
};
