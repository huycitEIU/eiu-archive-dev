import logger from "../utils/logger.js";

import type { Request, Response, NextFunction } from "express";
import type { RegisterRequestBody, LoginRequestBody } from "../types/auth.js";

import { userRepository } from "../repositories/userRepository.js";
import { authService } from "../services/authService.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

export async function register(
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
  next: NextFunction,
) {
  try {
    await authService.registerUser(req.body);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Registration successful.",
    });
  } catch (error) {
    next(error);
  }
}

export async function login(
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await authService.loginUser(req.body);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Login successful.",
      token: result.token,
    });
  } catch (error) {
    next(error);
  }
}

export async function logout(req: Request, res: Response, next: NextFunction) {
  try {
    // Xử lý đăng xuất (nếu cần)
    res.json({
      success: true,
      message: "Logout successful.",
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
}

export async function deleteUser(
  req: Request<{ userId: string }>,
  res: Response,
) {
  try {
    const { userId } = req.params;

    // Kiểm tra xem user có tồn tại không
    const user = await userRepository.findUserById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Xóa user theo userId
    await userRepository.deleteUserById(userId);

    res.json({
      success: true,
      message: "User deleted successfully.",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      message: "Error occurred during user deletion.",
      error: errorMessage,
    });
  }
}
