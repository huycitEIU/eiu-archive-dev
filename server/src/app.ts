import express from "express";
import cors from "cors";

// Import routes
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import documentsRoutes from "./routes/documentsRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

import logger from "./utils/logger.js";
import { logRequest } from "./middlewares/logger.js";
import { authMiddleware } from "./middlewares/authMiddleware.js";

import { errorMiddleware } from "./middlewares/errorMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(logRequest);

// Public routes
app.use(healthRoutes);
app.use("/api/auth", authRoutes);

app.use(authMiddleware); // Apply authentication middleware to all routes below

// Protected routes
app.use("/api/document", documentsRoutes);
app.use("/api/category", categoryRoutes);

app.use(errorMiddleware); // Error handling middleware

export default app;
