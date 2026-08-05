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

export const fileRepository = {
  insertFile,
};
