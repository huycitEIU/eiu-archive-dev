import axios from "axios";
import type { Feedback, FeedbackSubmission } from "../types/feedback.js";
import type { ApiResponse } from "../types/api.js";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const feedbackService = {
  submitFeedback: async (
    feedbackData: FeedbackSubmission,
  ): Promise<ApiResponse<null>> => {
    console.log("Submitting feedback:", feedbackData); // Debugging line
    if (!feedbackData.content || feedbackData.content.trim() === "") {
      feedbackData.content = "No additional comments provided.";
    }

    const response = await axios.post(
      `${API_URL}/api/feedback/submit`,
      feedbackData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    return response.data;
  },

  getAllFeedbacks: async (): Promise<Feedback[]> => {
    const response = await axios.get(`${API_URL}/api/feedback/list`);
    return response.data.feedbacks;
  },
};
