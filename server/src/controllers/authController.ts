import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

import logger from "../utils/logger.js";

import type { Request, Response } from "express";
import type { RegisterRequestBody, LoginRequestBody } from "../types/auth.js";
import { JWT_SECRET } from "../config/env.js";

import { userRepository } from "../repositories/userRepository.js";

export async function register(
  req: Request<{}, {}, RegisterRequestBody>,
  res: Response,
) {
  try {
    const { username, email, password } = req.body;

    // Kiểm tra xem các trường bắt buộc có được cung cấp không
    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message:
          "Missing required fields: username, email, and password are required.",
      });
    }

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format.",
      });
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be at least 6 characters long.",
      });
    }

    // Kiểm tra xem user tồn tại chưa
    const existingUser = await userRepository.findUserByUsername(username);

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Account already exists. Please choose a different username.",
      });
    }

    // Mã hoá mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Tạo user mới
    const newUser = await userRepository.createUser(
      username,
      email,
      hashedPassword,
    );

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      data: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });

    logger.info(
      { id: newUser.id, username: newUser.username, email: newUser.email },
      "New user registered successfully.",
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    res.status(500).json({
      success: false,
      message: "Error occurred during user registration.",
      error: errorMessage,
    });

    logger.error(error, "Error during user registration.");
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
