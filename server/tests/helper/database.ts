import prisma from "../../src/config/prisma.js";
import { bcryptUtils } from "../../src/utils/bcrypt.js";

export async function deleteUserById(id: string) {
  await prisma.user.delete({
    where: { id },
  });
}

export async function deleteUserByUsername(username: string) {
  // Check if the user exists before attempting to delete
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return; // User does not exist, nothing to delete
  }
  await prisma.user.delete({
    where: { username },
  });
}

export async function deleteUserByEmail(email: string) {
  await prisma.user.delete({
    where: { email },
  });
}

export async function addUser(
  username: string,
  email: string,
  password: string,
) {
  const hashedPassword = await bcryptUtils.hashPassword(password);

  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
}
