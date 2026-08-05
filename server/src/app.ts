import express from "express";
import cors from "cors";

// Import routes
import healthRoutes from "./routes/healthRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import documentsRoutes from "./routes/documentsRoutes.js";

import logger from "./utils/logger.js";
import { logRequest } from "./middlewares/logger.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logRequest);

// Routes test
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "EIU Archive API is running",
  });
});

// Route Auth API
app.use(healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/documents", documentsRoutes);

export default app;
