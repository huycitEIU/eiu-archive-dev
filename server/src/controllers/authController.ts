import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import logger from "../utils/logger.js";

import type { Request, Response, NextFunction } from "express";
import type { RegisterRequestBody, LoginRequestBody } from "../types/auth.js";
import { JWT_SECRET } from "../config/env.js";

import { userRepository } from "../repositories/userRepository.js";
import { authService } from "../services/authService.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";

import { ValidationError } from "../errors/ValidationError.js";
import { NotFoundError } from "../errors/NotFoundError.js";

export async function register(
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
  next: NextFunction,
) {
  try {
    const result = await authService.registerUser(req.body);

    res.status(HTTP_STATUS.OK).json(result);

    logger.info(result, "Registration successful.");
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
}

export async function login(
  req: Request<{}, {}, LoginRequestBody>,
  res: Response,
) {
  try {
    const { username, password } = req.body;

    // Tìm user theo username
    const user = await userRepository.findUserByUsername(username);

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Account does not exist.",
      });
    }

    // So sánh mật khẩu
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Wrong password.",
      });
    }

    // Tạo JWT Token

    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(payload, JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      message: "Login successful.",
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });

    logger.info(
      { id: user.id, username: user.username },
      "User logged in successfully.",
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      message: "Error occurred during user login.",
      error: errorMessage,
    });

    logger.error(error, "Error during user login.");
  }
}

export async function logout(req: Request, res: Response) {
  try {
    // Xử lý đăng xuất (nếu cần)
    res.json({
      success: true,
      message: "Logout successful.",
    });

    logger.info("User logged out successfully.");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      message: "Error occurred during user logout.",
      error: errorMessage,
    });

    logger.error(error, "Error during user logout.");
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

    logger.info({ userId }, "User deleted successfully.");
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    res.status(500).json({
      success: false,
      message: "Error occurred during user deletion.",
      error: errorMessage,
    });

    logger.error(error, "Error during user deletion.");
  }
}
