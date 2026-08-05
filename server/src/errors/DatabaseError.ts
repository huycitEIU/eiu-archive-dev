import { AppError } from "./AppError.js";

export class DatabaseError extends AppError {
  constructor(message: string = "Database error") {
    super(500, message);
  }
}
