import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

import logger from "../utils/logger.js";

import type { Request, Response } from "express";
import type { RegisterRequestBody, LoginRequestBody } from "../types/auth.js";
import { JWT_SECRET } from "../config/env.js";

export async function register(
    req: Request<{}, {}, RegisterRequestBody>,
    res: Response
) {
    try {
        const { username, email, password } = req.body;

        // Kiểm tra xem các trường bắt buộc có được cung cấp không
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Vui lòng điền đầy đủ thông tin.'
            });
        }

        // Kiểm tra định dạng email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Định dạng email không hợp lệ.'
            });
        }

        // Kiểm tra độ dài mật khẩu
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Mật khẩu phải có ít nhất 6 ký tự.'
            });
        }

        // Kiểm tra xem user tồn tại chưa
        const existingUser = await prisma.user.findFirst({
            where: {
                OR: [{ email }, { username }]
            }
        });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'Tài khoản đã tồn tại.'
            });
        }

        // Mã hoá mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Tạo user mới
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            success: true,
            message: 'User registered successfully.',
            data: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });

        logger.info({ id: newUser.id, username: newUser.username, email: newUser.email }, "New user registered successfully.");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);

        res.status(500).json({
            success: false,
            message: 'Error occurred during user registration.',
            error: errorMessage
        });

        logger.error(error, "Error during user registration.");
    }
}

export async function login(
    req: Request<{}, {}, LoginRequestBody>,
    res: Response
) {
    try {
        const { username, password } = req.body;

        // Tìm user theo username
        const user = await prisma.user.findUnique({
            where: { username }
        });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: 'Tài khoản không tồn tại.'
            })
        }

        // So sánh mật khẩu
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: 'Mật khẩu không đúng.'
            })
        }

        // Tạo JWT Token

        const payload = {
            id: user.id,
            username: user.username
        };

        const token = jwt.sign(
            payload,
            JWT_SECRET,
            {
                expiresIn: '1d'
            }
        );
        res.json({
            success: true,
            message: 'Đăng nhập thành công.',
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.role
            }
        });

        logger.info({ id: user.id, username: user.username }, "User logged in successfully.");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi đăng nhập.',
            error: errorMessage
        });

        logger.error(error, "Error during user login.");
    }
};

export async function logout(
    req: Request,
    res: Response
) {
    try {
        // Xử lý đăng xuất (nếu cần)
        res.json({
            success: true,
            message: 'Đăng xuất thành công.'
        });

        logger.info("User logged out successfully.");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred during user logout.',
            error: errorMessage
        });

        logger.error(error, "Error during user logout.");
    }
};

export async function deleteUser(
    req: Request<{ userId: string }>,
    res: Response
) {
    try {
        const { userId } = req.params;

        // Kiểm tra xem user có tồn tại không
        const user = await prisma.user.findUnique({
            where: { id: userId }
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found.'
            });
        }

        // Xóa user theo userId
        await prisma.user.delete({
            where: { id: userId }
        });

        res.json({
            success: true,
            message: 'User deleted successfully.'
        });

        logger.info({ userId }, "User deleted successfully.");
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        res.status(500).json({
            success: false,
            message: 'Error occurred during user deletion.',
            error: errorMessage
        });

        logger.error(error, "Error during user deletion.");
    }
};