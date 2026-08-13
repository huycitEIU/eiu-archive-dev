export interface UploadFileInfo {
  name: string;
  size: number;
  type: string;
}

export interface FileInfo {
  id: string;
  name: string;
  type: string;
  size: number;
  objectKey: string;
  url: string;
  createdAt: Date;
  updatedAt: Date;
  documentId: string;
}
