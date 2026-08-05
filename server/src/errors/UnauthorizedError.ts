import { AppError } from "./AppError.js";

export class UnauthorizedError extends AppError {
  constructor(message: string = "Unauthorized access") {
    super(401, message);
  }
}
