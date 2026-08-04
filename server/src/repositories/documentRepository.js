import prisma from "../config/prisma.js";
import logger from "../utils/logger.js";

const insertDocument = async (doc) => {
    try {

        const newDocument = await prisma.document.create({
            data: {
                title: doc.title,
                description: doc.description,
                category: { connect: { id: doc.categoryId } },
                user: { connect: { id: doc.userId } },
            }
        });

        return newDocument;
    } catch (error) {
        logger.error("Error inserting document:", error);
        throw new Error("An error occurred while inserting the document.");
    }
}

export {
    insertDocument
};