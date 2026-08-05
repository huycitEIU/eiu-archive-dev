import { AppError } from "./AppError.js";

export class ValidationError extends AppError {
  constructor(message: string = "Validation error") {
    super(400, message);
  }
}
