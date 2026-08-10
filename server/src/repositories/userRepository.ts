import prisma from "../config/prisma.js";
import logger from "../utils/logger.js";

export const userRepository = {
  deleteUserById: (userId: string) => {
    return prisma.user.delete({
      where: { id: userId },
    });
  },

  findUserByUsername: (username: string) => {
    return prisma.user.findUnique({
      where: { username },
    });
  },

  findUserByEmail: (email: string) => {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findUserById: (userId: string) => {
    return prisma.user.findUnique({
      where: { id: userId },
    });
  },

  findUserByUsernameOrEmail: (username: string, email: string) => {
    return prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });
  },

  createUser: async (
    username: string,
    email: string,
    hashedPassword: string,
  ) => {
    await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  },

  isUsernameExists: async (username: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    return !!user;
  },

  isEmailExists: async (email: string): Promise<boolean> => {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return !!user;
  },

  findAllUser: async () => {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
      },
    });
    return users;
  },
};
