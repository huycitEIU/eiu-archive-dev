import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import logger from "../utils/logger.js";

export const userController = {
  getAllUsers: async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      res.status(HTTP_STATUS.OK).json({
        success: true,
        users: users,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error when get all users",
      });
    }
  },
};
