import type { InsertDocumentData } from "../types/document.js";
import { documentRepository } from "../repositories/documentRepository.js";
import { fileService } from "./fileService.js";

import { storageService } from "./storageService.js";

import logger from "../utils/logger.js";

export const documentService = {
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
    return await documentRepository.findDocumentById(id);
  },
};
