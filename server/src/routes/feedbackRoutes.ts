import express from "express";
import { feedbackController } from "../controllers/feedbackController.js";

const router = express.Router();

router.post("/submit", feedbackController.submitFeedback);
router.get("/list", feedbackController.getAllFeedbacks);

export default router;
