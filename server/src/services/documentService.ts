import type { InsertDocumentData } from "../types/document.js";
import { documentRepository } from "../repositories/documentRepository.js";
import { fileService } from "./fileService.js";

import { storageService } from "./storageService.js";

import logger from "../utils/logger.js";

export const documentService = {
  rate: async (documentId: string, userId: string, rating: number) => {
    return await documentRepository.rate(documentId, userId, rating);
  },
  createDocument: async (data: InsertDocumentData) => {
    try {
      const newDocument = await documentRepository.insertDocument({
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        userId: data.userId,
      });

      return newDocument.id;
    } catch (error) {
      throw new Error("An error occurred while creating the document.");
    }
  },

  deleteDocument: async (documentId: string) => {
    try {
      await fileService.deleteFiles(documentId);
      await documentRepository.deleteDocumentById(documentId);
    } catch (error) {
      logger.error(error, `Error deleting document by ID: ${documentId}`);
      throw new Error("An error occurred while deleting the document.");
    }
  },

  getAllDocuments: async () => {
    return await documentRepository.findAllDocuments();
  },

  getDocumentById: async (id: string) => {
    return await documentRepository.findFullDocumentDataById(id);
  },

  bookmark: async (documentId: string, userId: string): Promise<boolean> => {
    const bookmark = await documentRepository.findBookmark(documentId, userId);
    if (bookmark) {
      await documentRepository.deleteBookmark(documentId, userId);
      return false;
    }
    await documentRepository.insertBookmark(documentId, userId);
    return true;
  },

  isBookmark: async (documentId: string, userId: string) => {
    return (await documentRepository.findBookmark(documentId, userId))
      ? true
      : false;
  },

  getBookmarkedDocuments: async (userId: string) => {
    return await documentRepository.getBookmarkedDocuments(userId);
  },

  increaseDownloandCount: async (documentId: string) => {
    await documentRepository.increaseDownloadCount(documentId);
  },
};
