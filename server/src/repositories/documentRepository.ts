import prisma from "../config/prisma.js";
import type {
  InsertDocumentData,
  UpdateDocumentData,
} from "../types/document.js";
import logger from "../utils/logger.js";

const insertDocument = async (doc: InsertDocumentData) => {
  try {
    const newDocument = await prisma.document.create({
      data: {
        title: doc.title,
        description: doc.description,
        category: { connect: { id: doc.categoryId } },
        user: { connect: { id: doc.userId } },
      },
    });

    return newDocument;
  } catch (error) {
    logger.error(error, "Error inserting document:");
    throw new Error("An error occurred while inserting the document.");
  }
};

const findAllDocuments = async () => {
  try {
    const documents = await prisma.document.findMany();

    logger.info(
      { documentCount: documents.length },
      "Fetched all documents successfully.",
    );
    return documents;
  } catch (error) {
    logger.error(error, "Error fetching all documents:");
    throw new Error("An error occurred while fetching all documents.");
  }
};

const findDocumentById = async (documentId: string) => {
  try {
    const document = await prisma.document.findUnique({
      where: { id: documentId },
    });

    if (!document) {
      logger.warn({ documentId }, "Document not found.");
      throw new Error("Document not found.");
    }

    logger.info({ documentId }, "Fetched document by ID successfully.");
    return document;
  } catch (error) {
    logger.error(error, "Error fetching document by ID:");
    throw new Error("An error occurred while fetching the document by ID.");
  }
};

const findDocumentsByUserId = async (userId: string) => {
  try {
    const documents = await prisma.document.findMany({
      where: { userId },
    });

    logger.info(
      { userId, documentCount: documents.length },
      "Fetched documents by user ID successfully.",
    );
    return documents;
  } catch (error) {
    logger.error(error, "Error fetching documents by user ID:");
    throw new Error("An error occurred while fetching documents by user ID.");
  }
};

const findDocumentCategories = async () => {
  try {
    const categories = await prisma.category.findMany();

    logger.info(
      { categoryCount: categories.length },
      "Fetched document categories successfully.",
    );
    return categories;
  } catch (error) {
    logger.error(error, "Error fetching document categories:");
    throw new Error("An error occurred while fetching document categories.");
  }
};

const findFilesByDocumentId = async (documentId: string) => {
  try {
    const files = await prisma.file.findMany({
      where: { documentId },
    });

    logger.info(
      { documentId, fileCount: files.length },
      "Fetched files by document ID successfully.",
    );
    return files;
  } catch (error) {
    logger.error(error, "Error fetching files by document ID:");
    throw new Error("An error occurred while fetching files by document ID.");
  }
};

const findFileById = async (fileId: string) => {
  try {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      logger.warn({ fileId }, "File not found.");
      throw new Error("File not found.");
    }

    logger.info({ fileId }, "Fetched file by ID successfully.");
    return file;
  } catch (error) {
    logger.error(error, "Error fetching file by ID:");
    throw new Error("An error occurred while fetching the file by ID.");
  }
};

const updateDocument = async (
  documentId: string,
  updatedData: UpdateDocumentData,
) => {
  try {
    const updatedDocument = await prisma.document.update({
      where: { id: documentId },
      data: updatedData,
    });

    if (!updatedDocument) {
      logger.warn({ documentId }, "Document not found for update.");
      throw new Error("Document not found for update.");
    }

    logger.info({ documentId }, "Updated document successfully.");
    return updatedDocument;
  } catch (error) {
    logger.error(error, "Error updating document:");
    throw new Error("An error occurred while updating the document.");
  }
};

const deleteDocumentById = async (documentId: string) => {
  try {
    await prisma.document.delete({
      where: { id: documentId },
    });

    logger.info({ documentId }, "Deleted document successfully.");
  } catch (error) {
    logger.error(error, "Error deleting document:");
    throw new Error("An error occurred while deleting the document.");
  }
};

const findFullDocumentDataById = async (id: string) => {
  try {
    const documentData = await prisma.document.findUnique({
      where: { id: id },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true,
            role: true,
            isActive: true,
          },
        },
      },
    });
    return documentData;
  } catch (err) {
    logger.error(err, "Document Repository: ");
    throw new Error("Error while find full document data");
  }
};

export const documentRepository = {
  insertDocument,
  findAllDocuments,
  findDocumentById,
  findDocumentsByUserId,
  findDocumentCategories,
  findFilesByDocumentId,
  findFileById,
  updateDocument,
  deleteDocumentById,
  findFullDocumentDataById,
};
