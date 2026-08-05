import prisma from "../config/prisma.js";

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

  createUser: (username: string, email: string, hashedPassword: string) => {
    return prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
  },
};
