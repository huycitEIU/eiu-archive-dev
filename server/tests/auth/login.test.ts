import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

import { mockUserLogin } from "../mocks/mockUser.js";
import { HTTP_STATUS } from "../../src/constants/httpStatus.js";
import { addUser, deleteUserByUsername } from "../helper/database.js";

describe("POST /api/auth/login", () => {
  beforeAll(async () => {
    // Register the user before running the login tests
    await addUser(
      mockUserLogin.username,
      mockUserLogin.email,
      mockUserLogin.password,
    );
  });

  afterAll(async () => {
    // Clean up the test user after all tests
    await deleteUserByUsername(mockUserLogin.username);
  });

  it(`should return ${HTTP_STATUS.OK} for successful login`, async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: mockUserLogin.username,
      password: mockUserLogin.password,
    });

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("message", "Login successful.");
    expect(response.body).toHaveProperty("token");
  });

  it(`should return ${HTTP_STATUS.NOT_FOUND} for non-existent user`, async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: "nonexistentuser",
      password: "somepassword",
    });

    expect(response.status).toBe(HTTP_STATUS.NOT_FOUND);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("message", "User not found.");
  });

  it(`should return ${HTTP_STATUS.BAD_REQUEST} for missing fields`, async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: mockUserLogin.username,
      // Missing password
    });

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("message", "Missing required fields.");
  });

  it(`should return ${HTTP_STATUS.BAD_REQUEST} for invalid password`, async () => {
    const response = await request(app).post("/api/auth/login").send({
      username: mockUserLogin.username,
      password: "wrongpassword",
    });

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("message", "Invalid password.");
  });
});
