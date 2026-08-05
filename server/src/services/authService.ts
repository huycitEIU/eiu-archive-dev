import { userRepository } from "../repositories/userRepository.js";
import { generateToken } from "../utils/jwt.js";
import { bcryptUtils } from "../utils/bcrypt.js";

export const authService = {
  async registerUser(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    const { username, email, password } = userData;

    const existingUser = await userRepository.findUserByUsername(username);

    if (existingUser) {
      throw new Error("Username already exists.");
    }

    const hashedPassword = await bcryptUtils.hashPassword(password);

    const newUser = await userRepository.createUser(
      username,
      email,
      hashedPassword,
    );

    return newUser;
  },

  async loginUser(userData: { username: string; password: string }) {
    const { username, password } = userData;

    const user = await userRepository.findUserByUsername(username);

    if (!user) {
      throw new Error("Invalid username or password.");
    }

    const isPasswordValid = await bcryptUtils.comparePasswords(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new Error("Invalid username or password.");
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
