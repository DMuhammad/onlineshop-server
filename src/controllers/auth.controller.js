const {
  validateSignIn,
  validateSignUp,
  validateUpdatePassword,
} = require("../dtos/auth.dto");
const AuthService = require("../services/auth.service");
const catchAsync = require("../utils/catchAsync");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");

const authService = new AuthService();

const signIn = catchAsync(async (req, res) => {
  const validated = validateSignIn(req.body);
  const { error, result } = await authService.signIn(validated);

  if (error) {
    return errorResponse(res, result.message, result, result.code);
  }

  res.cookie("refresh_token", result.refreshToken, {
    httpOnly: true,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7day
  });

  return successResponse(res, "Login successfully", result, result.code);
});

const signUp = catchAsync(async (req, res) => {
  const validated = validateSignUp(req.body);
  const { error, result } = await authService.signUp(validated);

  if (error) {
    return errorResponse(res, result.message, result, result.code);
  }

  return successResponse(res, "User created successfully", result, result.code);
});

const signOut = catchAsync(async (req, res) => {
  const { error, result } = await authService.signOut(req.cookies);

  if (error) {
    return errorResponse(res, result.message, result, result.code);
  }

  res.clearCookie("refresh_token", {
    httpOnly: true,
  });

  return successResponse(res, "Sign out successfully");
});

const changePassword = catchAsync(async (req, res) => {
  const validated = validateUpdatePassword(req.body);
  const { error, result } = await authService.changePassword(
    validated,
    req.params
  );

  if (error) {
    return errorResponse(res, result.message, result, result.code);
  }

  return successResponse(res, "Password updated successfully");
});

const refreshToken = catchAsync(async (req, res) => {
  const { error, result } = await authService.refreshToken(req.cookies);

  if (error) {
    return errorResponse(res, result.message, result, result.code);
  }

  return successResponse(res, "Successfully get access token", result, 200);
});

module.exports = {
  signIn,
  signUp,
  signOut,
  changePassword,
  refreshToken,
};
