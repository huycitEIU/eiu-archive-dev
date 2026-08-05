import { AppError } from "./AppError.js";

export class ConflictError extends AppError {
  constructor(message: string = "Conflict occurred") {
    super(409, message);
  }
}
