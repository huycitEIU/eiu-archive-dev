import prisma from "../config/prisma.js";
import logger from "../utils/logger.js";

const insertFile = async (file, documentId) => {
    try {
        const newFile = await prisma.file.create({
            data: {
                name: file.name,
                type: file.type,
                size: file.size,
                objectKey: file.objectKey,
                url: file.url,
                document: { connect: { id: documentId } },

            }
        });
        return newFile;
    } catch (error) {
        logger.error("Error inserting file:", error);
        throw new Error("An error occurred while inserting the file.");
    }
}

export {
    insertFile
};