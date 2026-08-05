import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../config/env.js";
import type { AuthTokenPayload } from "../types/auth.js";

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  // Get the token from the request headers
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify the token
  try {
    const payload = jwt.verify(token, JWT_SECRET) as AuthTokenPayload;

    req.user = payload; // Attach the payload to the request object for later use
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  authenticateToken(req, res, next);
}
