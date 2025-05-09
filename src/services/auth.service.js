const { PrismaClient } = require("../generated/prisma");
const ApiError = require("../utils/ApiError");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { successResponse } = require("../utils/responseFormatter");
require("dotenv").config();

class AuthService {
  async signIn({ email, password }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser)
      throw new ApiError(409, "Email not found. Please register first");
    if (!bcrypt.compareSync(password, existingUser.password))
      throw new ApiError(403, "Invalid password");

    const accessToken = jwt.sign(
      { id: existingUser.id, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { id: existingUser.id, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    return {
      id: existingUser.id,
      fullName: existingUser.fullName,
      accessToken,
      refreshToken,
    };
  }

  async signUp({ email, password, confirmPassword, fullName }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) throw new ApiError(409, "Email already registered");
    if (password !== confirmPassword)
      throw new ApiError(409, "Confirm password not match");

    const salt = bcrypt.genSaltSync();

    const user = await prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        password: bcrypt.hashSync(password, salt),
      },
    });

    return user;
  }

  async signOut({ refresh_token }) {
    if (!refresh_token) {
      throw new ApiError(402, "Refresh token not found");
    }

    return;
  }
}

module.exports = AuthService;
