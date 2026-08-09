import { describe, it, expect, vi, beforeEach } from "vitest";

import { authService } from "../../src/services/authService.js";
import { bcryptUtils } from "../../src/utils/bcrypt.js";
import { userRepository } from "../../src/repositories/userRepository.js";

describe("authController", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("should hash the password and create a new user successfully", async () => {
    const hashedPassword = "hashed-password";

    vi.spyOn(userRepository, "isUsernameExists").mockResolvedValue(false);

    vi.spyOn(bcryptUtils, "hashPassword").mockResolvedValue(hashedPassword);

    vi.spyOn(userRepository, "createUser").mockResolvedValue(undefined);

    await authService.registerUser({
      username: "testuser",
      email: "test@example.com",
      password: "password123",
    });

    expect(bcryptUtils.hashPassword).toHaveBeenCalledWith("password123");

    expect(userRepository.createUser).toHaveBeenCalledWith(
      "testuser",
      "test@example.com",
      hashedPassword,
    );
  });

  it("should throw ValidationError when required fields are missing", async () => {
    vi.spyOn(userRepository, "isUsernameExists");
    await expect(
      authService.registerUser({
        username: "",
        email: "test@example.com",
        password: "password123",
      }),
    ).rejects.toThrow("Missing required fields.");

    expect(userRepository.isUsernameExists).not.toHaveBeenCalled();
  });
});
