export interface Feedback {
  id: string;
  userId: string;
  status: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface FeedbackSubmission {
  mood: string;
  rating: number;
  content: string;
}
