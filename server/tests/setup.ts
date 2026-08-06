// Set the JWT secret for testing purposes
process.env.JWT_SECRET = "vitest-secret";

// Set the database URL for testing purposes
process.env.DATABASE_URL =
  "mysql://root:12345678@localhost:3306/eiu_archive_test";
