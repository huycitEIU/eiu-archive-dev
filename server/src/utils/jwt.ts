import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import { AuthTokenPayload } from "../types/auth.js";

export function generateToken(
  payload: AuthTokenPayload,
  expiresIn: string = "1d",
): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn } as jwt.SignOptions);
}
