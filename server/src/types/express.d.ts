import { Express } from "express";
import { AuthTokenPayload } from "./auth.js";
declare global {
  namespace Express {
    interface Request {
      user: AuthTokenPayload;
    }
  }
}
