import express from "express";
import cors from "cors";

// Import routes
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import documentsRoutes from "./routes/documentsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import fileRoutes from "./routes/fileRoutes.js";

import { logRequest } from "./middlewares/logger.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(logRequest);

app.use("/healthz", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// Public routes
app.use("/api", healthRoutes);
app.use("/api/auth", authRoutes);

app.use(authMiddleware); // Apply authentication middleware to all routes below

// Protected routes
app.use("/api/user", userRoutes);
app.use("/api/document", documentsRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/feedback", feedbackRoutes);
app.use("/api/file", fileRoutes);

app.use(errorMiddleware); // Error handling middleware

export default app;
