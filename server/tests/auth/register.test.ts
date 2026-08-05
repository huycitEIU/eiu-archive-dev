import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

import { userRepository } from "../../src/repositories/userRepository.js";

const testUser = {
  username: "testuser",
  password: "testpassword",
  email: "userEmail@eiu.edu.vn",
};

describe("POST /api/auth/register", () => {
  it("should return 201 and a success message for valid registration", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send(testUser);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User registered successfully.");
  });

  it("should return 400 for missing username or password", async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: "",
      password: "",
    });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });
});

describe("DELETE /api/auth/:userId", () => {
  it("should return 200 and a success message for valid user deletion", async () => {
    const userToDelete = await userRepository.findUserByUsername(
      testUser.username,
    );

    if (!userToDelete) {
      throw new Error("Test user not found for deletion.");
    }

    const userIdToDelete = userToDelete.id;

    const response = await request(app).delete(`/api/auth/${userIdToDelete}`);

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("User deleted successfully.");
  });

  it("should return 404 for non-existing user", async () => {
    const nonExistingUserId = "nonExistingUserId"; // Replace with a non-existing user ID for testing

    const response = await request(app).delete(
      `/api/auth/${nonExistingUserId}`,
    );

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("User not found.");
  });
});
