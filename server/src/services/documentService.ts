import type { InsertDocumentData } from "../types/document.js";
import { documentRepository } from "../repositories/documentRepository.js";
import { generateUploadPresignedUrl } from "./storageService.js";

export const documentService = {
  createDocument: async (
    data: InsertDocumentData,
    files: { name: string; type: string }[],
  ) => {
    try {
      const newDocument = await documentRepository.insertDocument({
        title: data.title,
        description: data.description,
        categoryId: data.categoryId,
        userId: data.userId,
      });

      const presignedUrls = await Promise.all(
        files.map(async (file) => {
          const uniqueFileName = `${Date.now()}-${file.name}`;

          const presignedUrl = await generateUploadPresignedUrl(
            uniqueFileName,
            file.type,
          );
          return {
            name: file.name,
            url: presignedUrl,
            objectKey: uniqueFileName, // Store the unique file name for later reference
          };
        }),
      );

      return {
        documentId: newDocument.id,
        presignedUrls,
      };
    } catch (error) {
      throw new Error("An error occurred while creating the document.");
    }
  },

  deleteDocument: async (documentId: string) => {
    try {
      await documentRepository.deleteDocumentById(documentId);
    } catch (error) {
      throw new Error("An error occurred while deleting the document.");
    }
  },
};
