import { fileRepository } from "../repositories/fileRepository.js";
import { storageService } from "./storageService.js";
import logger from "../utils/logger.js";

const deleteFiles = async (documentId: string) => {
  try {
    const files = await fileRepository.findFiles(documentId);

    await Promise.all(
      files.map(async (file) => {
        logger.info(file, "Delete file: ");
        return await storageService.deleteFile(file.objectKey);
      }),
    );

    await fileRepository.deleteFileByDocumentId(documentId);
  } catch (error) {
    logger.error(error, "File Service: ");
    throw new Error("An error occurred while deleting files by document id");
  }
};

export const fileService = {
  deleteFiles,
};
