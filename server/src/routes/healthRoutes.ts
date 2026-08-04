import express from "express";

const router = express.Router();

router.get('/health', (_req, res) => {
    res.json({
        success: true,
        message: 'EIU Archive API is running'
    });
});

export default router;