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
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  coverUrl: string;
}

export interface OverviewDocument {
  id: string;
  title: string;
  description: string;
  bookmarkCount: number;
  downloadCount: number;
  ratingSum: number;
  ratingCount: number;
  averageRating: number;
  categoryId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  coverUrl: string;
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    isActive: boolean;
  };
}

export interface CreateDocumentData {
  title: string;
  categoryId: string;
  description?: string;
  coverImage?: File;
}
