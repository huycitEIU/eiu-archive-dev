import prisma from "../config/prisma.js";

export const categoryRepository = {
  getAllCategories: async () => {
    try {
      const categories = await prisma.category.findMany();
      return categories;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw new Error("Failed to fetch categories");
    }
  },
};
