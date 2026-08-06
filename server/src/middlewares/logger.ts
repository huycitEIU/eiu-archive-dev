import logger from "../utils/logger.js";
import type { Request, Response, NextFunction } from "express";

export const logRequest = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();

  // res.on("finish", () => {
  //   const duration = Date.now() - startTime;
  //   logger.info(
  //     {
  //       method: req.method,
  //       url: req.originalUrl,
  //       status: res.statusCode,
  //       duration,
  //       ip: req.ip,
  //       userId: req.user?.id,
  //     },
  //     "Request completed",
  //   );
  // });

  next();
};
