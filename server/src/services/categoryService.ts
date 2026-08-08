import { categoryRepository } from "../repositories/categoryRepository.js";

export const categoryService = {
  getAllCategories: async () => {
    try {
      const categories = await categoryRepository.getAllCategories();
      return categories;
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  },
};
