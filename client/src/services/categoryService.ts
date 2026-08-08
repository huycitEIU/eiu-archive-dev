import axios from "axios";
import type { Category } from "../types/category";
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
export const categoryService = {
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/category/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const categories: Category[] = response.data;
      return categories;
    } catch (error) {
      throw new Error("Failed to fetch categories");
    }
  },
};

export default categoryService;
