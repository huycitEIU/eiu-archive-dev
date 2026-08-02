import express from "express";
import cors from "cors";

// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

// Import routes
import authRoutes from "./routes/authRoutes.js";
import documentsRoutes from "./routes/documentsRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Routes test
app.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'EIU Archive API is running'
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})

// Route Auth API
app.use('/api/auth', authRoutes);
app.use('/api/documents', documentsRoutes);

