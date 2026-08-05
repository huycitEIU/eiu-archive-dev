import logger from "../utils/logger.js";
import { AppError } from "../errors/AppError.js";
import { Request, Response, NextFunction } from "express";
export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }
  logger.error(err, "Unexpected error occurred.");
  res.status(500).json({
    success: false,
    message: "An unexpected error occurred.",
  });
}
