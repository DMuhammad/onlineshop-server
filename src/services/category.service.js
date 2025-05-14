const { PrismaClient } = require("../generated/prisma");

const prisma = new PrismaClient();

class CategoryService {
  async getCategories() {
    const categories = await prisma.category.findMany();

    return {
      error: false,
      result: categories,
    };
  }

  async addNewCategory({ name }) {
    const category = await prisma.category.findUnique({
      where: {
        name: name,
      },
    });

    if (category) {
      return {
        error: true,
        result: {
          message: "Category is already exist",
          code: 409,
        },
      };
    }

    const newCategory = await prisma.category.create({
      data: {
        name: name,
      },
    });

    return {
      error: false,
      result: newCategory,
    };
  }

  async updateCategory({ name }, { categoryId }) {
    const updatedCategory = await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: name,
      },
    });

    return {
      error: false,
      result: updatedCategory,
    };
  }

  async deleteCategoryById({ categoryId }) {
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return;
  }
}

module.exports = CategoryService;
