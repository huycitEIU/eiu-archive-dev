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
            message: 'Đăng ký thành công.',
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
            message: 'Đã xảy ra lỗi khi đăng ký tài khoản.',
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
