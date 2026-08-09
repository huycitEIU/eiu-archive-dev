import { describe, it, expect, afterEach } from "vitest";
import request from "supertest";
import app from "../../src/app.js";

import { mockUserRegister } from "../mocks/mockUser.js";

import { HTTP_STATUS } from "../../src/constants/httpStatus.js";
import { deleteUserByUsername } from "../helper/database.js";

describe.skip("POST /api/auth/register", () => {
  afterEach(async () => {
    // Clean up the test user after each test
    await deleteUserByUsername(mockUserRegister.username);
  });

  it(`should return ${HTTP_STATUS.OK} for successful registration`, async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: mockUserRegister.username,
      password: mockUserRegister.password,
      email: mockUserRegister.email,
    });

    expect(response.status).toBe(HTTP_STATUS.OK);
    expect(response.body).toHaveProperty("success", true);
    expect(response.body).toHaveProperty("message", "Registration successful.");
  });

  it(`should return ${HTTP_STATUS.BAD_REQUEST} for missing fields`, async () => {
    const response = await request(app).post("/api/auth/register").send({
      username: mockUserRegister.username,
      // Missing password and email
    });

    expect(response.status).toBe(HTTP_STATUS.BAD_REQUEST);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("message", "Missing required fields.");
  });

  it(`should return ${HTTP_STATUS.CONFLICT} for duplicate username`, async () => {
    // First, register the user
    await request(app).post("/api/auth/register").send({
      username: mockUserRegister.username,
      password: mockUserRegister.password,
      email: mockUserRegister.email,
    });

    // Attempt to register the same user again
    const response = await request(app).post("/api/auth/register").send({
      username: mockUserRegister.username,
      password: mockUserRegister.password,
      email: mockUserRegister.email,
    });

    expect(response.status).toBe(HTTP_STATUS.CONFLICT);
    expect(response.body).toHaveProperty("success", false);
    expect(response.body).toHaveProperty("message", "Username already exists.");
  });
});
