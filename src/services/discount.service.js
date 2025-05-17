const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();

class DiscountService {
  async getAll() {
    const discounts = await prisma.discount.findMany();

    return discounts;
  }

  async addNewDiscount({ code, value, start, exp, quota }) {
    const discount = await prisma.discount.findUnique({
      where: {
        code: code,
      },
    });

    if (discount) {
      return {
        error: true,
        result: {
          message: "Code already exist",
          code: 409,
        },
      };
    }

    const newVoucher = await prisma.discount.create({
      data: {
        code: code,
        startDate: start,
        expiredDate: exp,
        value: value,
        quota: quota,
      },
    });

    return {
      error: false,
      result: newVoucher,
    };
  }

  async checkCode({ code }) {
    const voucher = await prisma.discount.findUnique({
      where: {
        code,
      },
    });

    if (!voucher) {
      return {
        error: true,
        result: {
          message: "Code is invalid",
          code: 409,
        },
      };
    }

    const today = new Date().toISOString();

    if (today < voucher.startDate || today >= voucher.expiredDate) {
      return {
        error: true,
        result: {
          message: "Code is expired",
          code: 409,
        },
      };
    }

    return {
      error: false,
      result: true,
    };
  }

  async updateVoucher({ quota }, { id: code_id }) {
    const existing = await prisma.discount.findUnique({
      where: {
        id: code_id,
      },
    });

    if (!existing) {
      return {
        error: true,
        result: {
          message: "Voucher not found.",
          code: 409,
        },
      };
    }

    const updatedVoucher = await prisma.discount.update({
      where: {
        id: code_id,
      },
      data: {
        quota: quota,
      },
    });

    return {
      error: false,
      result: updatedVoucher,
    };
  }
}

module.exports = DiscountService;
