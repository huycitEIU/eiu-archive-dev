import express from "express";
import cors from "cors";

// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

// Import routes
import authRoutes from "./routes/authRoutes.js";
import documentsRoutes from "./routes/documentsRoutes.js";

import logger from "./utils/logger.js";
import { logRequest } from "./middlewares/logger.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(logRequest);

// Routes test
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'EIU Archive API is running'
    });
});

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
})

// Route Auth API
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentsRoutes);

