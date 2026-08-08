import { Request, Response } from "express";

import { categoryService } from "../services/categoryService.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";
export const categoryController = {
  getAllCategories: async (req: Request, res: Response) => {
    try {
      const categories = await categoryService.getAllCategories();
      res.status(HTTP_STATUS.OK).json(categories);
    } catch (error) {
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to fetch categories" });
    }
  },
};
