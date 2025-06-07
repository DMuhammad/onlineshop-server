const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class AuthService {
  async signIn({ email, password }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      return {
        error: true,
        result: {
          message: "Email not found. Please register first.",
          code: 409,
        },
      };
    }

    if (!bcrypt.compareSync(password, existingUser.password)) {
      return {
        error: true,
        result: {
          message: "Invalid Password",
          code: 403,
        },
      };
    }

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
      error: false,
      result: {
        id: existingUser.id,
        fullName: existingUser.fullName,
        accessToken,
        refreshToken,
        code: 200,
      },
    };
  }

  async signUp({ email, password, confirmPassword, fullName }) {
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return {
        error: true,
        result: {
          message: "Email already registered",
          code: 409,
        },
      };
    }
    if (password !== confirmPassword) {
      return {
        error: true,
        result: {
          message: "Confirm password not match",
          code: 409,
        },
      };
    }

    const salt = bcrypt.genSaltSync();

    const user = await prisma.user.create({
      data: {
        fullName: fullName,
        email: email,
        password: bcrypt.hashSync(password, salt),
      },
      omit: {
        password: true,
      },
    });

    return {
      error: false,
      result: user,
    };
  }

  async signOut({ refresh_token }) {
    if (!refresh_token) {
      return {
        error: true,
        result: {
          message: "Refresh token not found",
          code: 402,
        },
      };
    }

    return {
      error: false,
      result: null,
    };
  }

  async refreshToken({ refresh_token }) {
    if (!refresh_token) {
      return {
        error: true,
        result: {
          message: "Refresh token not found",
          code: 402,
        },
      };
    }

    const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    return {
      error: false,
      result: accessToken,
    };
  }

  async changePassword({ oldPassword, newPassword, confirmPassword }, { id }) {
    const existingUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!existingUser) {
      return {
        error: true,
        result: {
          message: "User not found",
          code: 409,
        },
      };
    }

    if (!bcrypt.compareSync(oldPassword, existingUser.password)) {
      return {
        error: true,
        result: {
          message: "Invalid password",
          code: 403,
        },
      };
    }

    if (newPassword != confirmPassword) {
      return {
        error: true,
        result: {
          message: "Confirm password not match",
          code: 409,
        },
      };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        password: bcrypt.hashSync(newPassword, bcrypt.genSaltSync()),
      },
      omit: {
        password: true,
      },
    });

    return {
      error: false,
      result: updatedUser,
    };
  }
}

module.exports = AuthService;
