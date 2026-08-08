export interface Feedback {
  id: string;
  userId: string;
  status: "pending" | "reviewed" | "resolved";
  content: string;
  createdAt: Date;
  updatedAt: Date;
}
