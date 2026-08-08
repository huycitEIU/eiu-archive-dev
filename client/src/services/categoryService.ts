import axios from "axios";
import type { Category } from "../types/category";

export const categoryService = {
  getCategories: async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/category/list",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const categories: Category[] = response.data;
      return categories;
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  },
};

export default categoryService;
