import { describe, it, expect } from "vitest";
import request from "supertest";

import app from "../src/app.js";

describe("Health Check", () => {
  it("GET /health should return 200 and success message", async () => {
    const response = await request(app).get("/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: "EIU Archive API is running",
    });
  });
});
