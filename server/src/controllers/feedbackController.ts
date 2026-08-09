import { Request, Response } from "express";
import prisma from "../config/prisma.js";

import logger from "../utils/logger.js";
import { Feedback, FeedbackSubmissionBody } from "../types/feedback.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { feedbackRepository } from "../repositories/feedbackRepository.js";

export const feedbackController = {
  submitFeedback: async (
    req: Request<{}, {}, FeedbackSubmissionBody>,
    res: Response,
  ) => {
    try {
      await feedbackRepository.insertFeedback({
        userId: req.user.id,
        mood: req.body.mood,
        rating: req.body.rating,
        content: req.body.content,
      });
      res
        .status(HTTP_STATUS.CREATED)
        .json({ success: true, message: "Feedback submitted successfully" });
    } catch (error) {
      logger.error(error, "Error submitting feedback:");
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal server error" });
    }
  },

  getAllFeedbacks: async (_req: Request, res: Response) => {
    try {
      const feedbacks = await feedbackRepository.getAllFeedbacks();
      res.status(HTTP_STATUS.OK).json({ success: true, feedbacks });
    } catch (error) {
      logger.error(error, "Error fetching feedbacks:");
      res
        .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
        .json({ success: false, message: "Internal server error" });
    }
  },
};
