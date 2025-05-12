const UserService = require("../services/user.service");
const catchAsync = require("../utils/catchAsync");
const {
  errorResponse,
  successResponse,
} = require("../utils/responseFormatter");

const userService = new UserService();

const getUserById = catchAsync(async (req, res) => {
  const { error, result } = await userService.getProfile(req.params);

  if (error) {
    return errorResponse(res, result.message, result, result.code);
  }

  return successResponse(res, "Successfully get user data", result, 200);
});

const updateUser = catchAsync(async (req, res) => {
  const { error, result } = await userService.updateProfile(
    req.body,
    req.params
  );

  if (error) {
    return errorResponse(res, result.message, result, result.code);
  }

  return successResponse(res, "User updated successfully", result, 201);
});

module.exports = {
  getUserById,
  updateUser,
};
