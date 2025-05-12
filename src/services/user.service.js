const { PrismaClient } = require("../generated/prisma");

const { user } = new PrismaClient({
  omit: {
    user: {
      password: true,
    },
  },
});

class UserService {
  async getProfile({ userid }) {
    const existingUser = await user.findUnique({
      where: {
        id: userid,
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

    return {
      error: false,
      result: existingUser,
    };
  }
  async updateProfile(
    { photoUrl = "", phoneNumber = "", address = "" },
    { userid }
  ) {
    const existingUser = await user.findUnique({
      where: {
        id: userid,
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

    const updatedUser = await user.update({
      where: {
        id: userid,
      },
      data: {
        address: address == "" ? existingUser.address : address,
        phone: phoneNumber == "" ? existingUser.phone : phoneNumber,
        photoUrl: photoUrl == "" ? existingUser.photoUrl : photoUrl,
      },
    });

    return {
      error: false,
      result: updatedUser,
    };
  }
}

module.exports = UserService;
