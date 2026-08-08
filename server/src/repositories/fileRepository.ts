import prisma from "../config/prisma.js";
import logger from "../utils/logger.js";

import type { File, InsertFileData } from "../types/file.js";

const insertFile = async (file: InsertFileData, documentId: string) => {
  try {
    const newFile = await prisma.file.create({
      data: {
        name: file.name,
        type: file.type,
        size: file.size,
        objectKey: file.objectKey,
        url: file.url,
        document: { connect: { id: documentId } },
      },
    });
    return newFile;
  } catch (error) {
    logger.error(error, "Error inserting file:");
    throw new Error("An error occurred while inserting the file.");
  }
};

const deleteFileByDocumentId = async (documentId: string) => {
  try {
    await prisma.file.deleteMany({
      where: { documentId: documentId },
    });
  } catch (error) {
    logger.error(error, "Error deleting files by document id.");
    throw new Error("An error occurred while deleting files by document id.");
  }
};

const findFiles = async (documentId: string) => {
  try {
    return await prisma.file.findMany({
      where: { documentId: documentId },
    });
  } catch (error) {
    logger.error(error, "Error occurred while finding files by document id.");
    throw new Error("An error when finding files");
  }
};

export const fileRepository = {
  insertFile,
  deleteFileByDocumentId,
  findFiles,
};
