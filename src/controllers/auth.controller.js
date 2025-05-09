const { validateSignIn, validateSignUp } = require("../dtos/auth.dto");
const AuthService = require("../services/auth.service");
const {
  successResponse,
  errorResponse,
} = require("../utils/responseFormatter");

const authService = new AuthService();

const signIn = async (req, res, next) => {
  try {
    const validated = validateSignIn(req.body);
    const result = await authService.signIn(validated);

    res.cookie("refresh_token", result.refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7day
    });

    return successResponse(res, "Login successfully", result, 200);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "error", error);
  }
};

const signUp = async (req, res, next) => {
  try {
    const validated = validateSignUp(req.body);
    const result = await authService.signUp(validated);

    return successResponse(res, "User created successfully", result, 201);
  } catch (error) {
    console.log(error);
    return errorResponse(res, "error", error);
  }
};

const signOut = async (req, res, next) => {
  try {
    await authService.signOut(req.cookies);

    res.clearCookie("refresh_token", {
      httpOnly: true,
    });

    return successResponse(res, "Sign out successfully");
  } catch (error) {
    console.log(error);
    return errorResponse(res, "error", error);
  }
};

module.exports = {
  signIn,
  signUp,
  signOut,
};
