import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

const register = async (req, res) => {
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
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi đăng ký tài khoản.',
            error: error.message
        });
    }
}

const login = async (req, res) => {
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
        const token = jwt.sign(
            {
                id: user.id,
                username: user.username
            },
            process.env.JWT_SECRET,
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
    } catch (error) {
        logger.error("Error during login:", error);
        res.status(500).json({
            success: false,
            message: 'Đã xảy ra lỗi khi đăng nhập.',
            error: error.message
        });
    }
};


export { register, login };