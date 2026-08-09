export interface Feedback {
  id: string;
  userId: string;
  status: string;
  content: string;
  rating: number;
  mood: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackSubmissionBody {
  mood: string;
  rating: number;
  content: string;
}

export interface InsertFeedbackData {
  userId: string;
  mood: string;
  rating: number;
  content: string;
}
