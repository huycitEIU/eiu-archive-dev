import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";

import { userRepository } from "../repositories/userRepository.js";

export const authService = {
  async registerUser(userData: {
    username: string;
    email: string;
    password: string;
  }) {
    const { username, email, password } = userData;

    // Check if the user already exists
    const existingUser = await userRepository.findUserByUsername(username);
    if (existingUser) {
      throw new Error("Username already exists.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await userRepository.createUser(
      username,
      email,
      hashedPassword,
    );
    return newUser;
  },

  async loginUser(userData: { username: string; password: string }) {
    const { username, password } = userData;

    // Find the user by username
    const user = await userRepository.findUserByUsername(username);
    if (!user) {
      throw new Error("Invalid username or password.");
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Invalid username or password.");
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      },
    );

    return { token, user };
  },

  async logoutUser() {
    // Invalidate the token on the client side (handled in the frontend)
    // Optionally, you can implement token blacklisting on the server side if needed
  },

  async deleteUser(userId: string) {
    // Check if the user exists
    const user = await userRepository.findUserById(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    // Delete the user by userId
    await userRepository.deleteUserById(userId);
  },
};
