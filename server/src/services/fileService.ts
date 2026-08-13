import { fileRepository } from "../repositories/fileRepository.js";
import { storageService } from "./storageService.js";
import logger from "../utils/logger.js";
import { NotFoundError } from "../errors/NotFoundError.js";
import type { File, InsertFileData } from "../types/file.js";

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

async function getFileById(id: string): Promise<File> {
  try {
    const file = await fileRepository.findFile(id);
    if (!file) {
      throw new NotFoundError("File not found.");
    }
    return file;
  } catch (error) {
    logger.error(error, "File Service: ");
    throw new Error("An error while finding file by id");
  }
}

async function confirmUpload(
  documentId: string,
  files: InsertFileData[],
): Promise<void> {
  try {
    await Promise.all(
      files.map(async (file) => {
        const { name, type, objectKey, size } = file;
        await fileRepository.insertFile(file, documentId);
        logger.info(
          { name, type, objectKey, documentId },
          "File Service: Confirmed upload for file.",
        );
      }),
    );
  } catch (error) {
    logger.error(error, "File Service: ");
    throw new Error("An error occurred while confirming file upload.");
  }
}

export const fileService = {
  deleteFiles,
  getFileById,
  confirmUpload,
};
