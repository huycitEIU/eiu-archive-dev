import prisma from "../config/prisma.js";
import { Feedback, InsertFeedbackData } from "../types/feedback.js";

export const feedbackRepository = {
  insertFeedback: async (feedbackData: InsertFeedbackData): Promise<void> => {
    await prisma.feedback.create({
      data: feedbackData,
    });
  },

  getAllFeedbacks: async (): Promise<Feedback[]> => {
    return await prisma.feedback.findMany();
  },
};
