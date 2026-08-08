export interface CreateDocumentRequestBody {
  title: string;
  description: string;
  categoryId: string;
  tags: string[];
  files: {
    name: string;
    type: string;
  }[];
}

export interface File {
  name: string;
  type: string;
}

export interface Document {
  id: string;
  title: string;
  description: string;
  bookmarkCount: number;
  downloadCount: number;
  ratingSum: number;
  ratingCount: number;
  averageRating: number;
  categoryId: string;
  tags: string[];
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}
