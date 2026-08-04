import prisma from "../config/prisma.js";

export function deleteUserById(userId: string) {
    return prisma.user.delete({
        where: { id: userId }
    });
}

export function findUserByUsername(username: string) {
    return prisma.user.findUnique({
        where: { username }
    });
}

export function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: { email }
    });
}

export function createUser(username: string, email: string, hashedPassword: string) {
    return prisma.user.create({
        data: {
            username,
            email,
            password: hashedPassword
        }
    });
}