import { AppError } from "./AppError.js";

export class ForbiddenError extends AppError {
  constructor(message: string = "Forbidden access") {
    super(403, message);
  }
}
