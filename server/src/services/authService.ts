import { userRepository } from "../repositories/userRepository.js";
import { generateToken } from "../utils/jwt.js";
import { bcryptUtils } from "../utils/bcrypt.js";

import { ConflictError } from "../errors/ConflictError.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import { ValidationError } from "../errors/ValidationError.js";

export const authService = {
  async registerUser(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    const { username, email, password } = userData;

    // Check required fields
    if (!username || !email || !password) {
      throw new ValidationError("Missing required fields.");
    }

    const isExist = await userRepository.isUsernameExists(username);

    if (isExist) {
      throw new ConflictError("Username already exists.");
    }

    const hashedPassword = await bcryptUtils.hashPassword(password);

    await userRepository.createUser(username, email, hashedPassword);
  },

  async loginUser(userData: { username: string; password: string }) {
    const { username, password } = userData;

    // Check required fields
    if (!username || !password) {
      throw new ValidationError("Missing required fields.");
    }

    const user = await userRepository.findUserByUsername(username);

    if (!user) {
      throw new NotFoundError("User not found.");
    }

    const isPasswordValid = await bcryptUtils.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new ValidationError("Invalid password.");
    }

    const token = generateToken({ id: user.id, username: user.username });

    return { token, user };
  },

  async logoutUser() {
    // Invalidate the token on the client side (handled in the frontend)
    // Optionally, you can implement token blacklisting on the server side if needed
  },

  async deleteUser(userId: string) {
    const user = await userRepository.findUserById(userId);

    if (!user) {
      throw new Error("User not found.");
    }

    await userRepository.deleteUserById(userId);
  },
};
