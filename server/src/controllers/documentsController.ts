import { Request, Response } from "express";
import prisma from "../config/prisma.js";
import { storageService } from "../services/storageService.js";

import { fileRepository } from "../repositories/fileRepository.js";
import { documentService } from "../services/documentService.js";

import logger from "../utils/logger.js";

import type {
  CreateDocumentRequestBody,
  UploadDocumentRequestBody,
} from "../types/document.js";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { archiveService } from "../services/archiveService.js";

/**
 * This function handles the first step of the document upload process.
 * It receives the document metadata from the request, then it will:
 * 1. Validate the received metadata.
 * 2. Store the metadata in the database.
 * 3. Request a pre-signed URL from the storage service (e.g., AWS S3) for the actual file upload.
 * 4. Return the pre-signed URL to the client, which can then use it to upload the document's files directly to the storage service.
 *
 * @param {express.Request} req
 * @param {express.Response} res
 */
export async function createDocument(
  req: Request<{}, {}, CreateDocumentRequestBody>,
  res: Response,
) {
  try {
    const data = req.body;
    const userId = req.user.id;

    const documentId = await documentService.createDocument({
      ...data,
      userId,
    });

    res.status(HTTP_STATUS.OK).json({
      success: true,
      message: "Created document successful",
      document: {
        id: documentId,
      },
    });
  } catch (err) {
    logger.error("Error while creating document.");
  }
}

export async function uploadDocument(
  req: Request<{}, {}, UploadDocumentRequestBody>,
  res: Response,
) {
  try {
    const { documentId, files } = req.body;

    if (!documentId || !files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameters: documentId and files.",
      });
    }

    // Update the document record in the database with the uploaded file information
    await Promise.all(
      files.map(async (file) => {
        return await fileRepository.insertFile(file, documentId);
      }),
    );

    res.status(200).json({
      success: true,
      message: "Document upload completed successfully.",
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    res.status(500).json({
      success: false,
      message: "An error occurred while completing the document upload.",
      error: errorMessage,
    });

    logger.error(error, "Error during document upload.");
  }
}

export async function getDocuments(req: Request, res: Response) {
  try {
    const userId = req.user!.id;
    const documents = await prisma.document.findMany({
      where: { userId },
    });

    res.status(200).json({
      success: true,
      data: documents,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy danh sách tài liệu.",
      error: errorMessage,
    });

    logger.error(error, "Error fetching document list.");
  }
}

export async function getDocumentsByUserId(
  req: Request<{ userId: string }>,
  res: Response,
) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: userId.",
      });
    }

    const documents = await prisma.document.findMany({
      where: { userId },
    });

    res.status(200).json({
      success: true,
      data: documents,
    });

    logger.info(
      { userId, documentCount: documents.length },
      "Fetched documents for user successfully.",
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    res.status(500).json({
      success: false,
      message: "An error occurred while fetching documents for the user.",
      error: errorMessage,
    });

    logger.error(error, "Error during fetching documents by userId.");
  }
}

export async function getDocumentCategories(req: Request, res: Response) {
  try {
    const categories = await prisma.category.findMany();

    res.status(200).json({
      success: true,
      data: categories,
    });

    logger.info(
      { categoryCount: categories.length },
      "Fetched document categories successfully.",
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    res.status(500).json({
      success: false,
      message: "Đã xảy ra lỗi khi lấy danh sách danh mục tài liệu.",
      error: errorMessage,
    });

    logger.error(error, "Error during fetching document categories.");
  }
}

export async function getFilesByDocumentId(
  req: Request<{ documentId: string }>,
  res: Response,
) {
  try {
    const { documentId } = req.params;

    if (!documentId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: documentId.",
      });
    }

    const files = await prisma.file.findMany({
      where: { documentId },
    });

    res.status(200).json({
      success: true,
      files: files,
    });

    logger.info(
      { documentId, fileCount: files.length },
      "Fetched files for document successfully.",
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    res.status(500).json({
      success: false,
      message: "An error occurred while fetching files for the document.",
      error: errorMessage,
    });

    logger.error(error, "Error during fetching files by documentId.");
  }
}

export async function downloadFileById(
  req: Request<{ fileId: string }>,
  res: Response,
) {
  try {
    const { fileId } = req.params;

    if (!fileId) {
      return res.status(400).json({
        success: false,
        message: "Missing required parameter: fileId.",
      });
    }

    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: "File not found.",
      });
    }

    // Here you would typically generate a pre-signed URL for the file download
    const presignedUrl = await storageService.generateDownloadPresignedUrl(
      file.objectKey,
      file.name,
      file.type,
    );

    res.status(200).json({
      success: true,
      data: {
        url: presignedUrl,
      },
    });

    logger.info(
      { fileId, objectKey: file.objectKey },
      "Generated download URL for file successfully.",
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    res.status(500).json({
      success: false,
      message: "An error occurred while generating the download URL.",
      error: errorMessage,
    });

    logger.error(error, "Error during generating download URL for file.");
  }
}

export const documentsController = {
  createDocument,
  uploadDocument,
  getDocuments,
  getDocumentsByUserId,
  getDocumentCategories,
  getFilesByDocumentId,
  downloadFileById,
  rateDocument: async (
    req: Request<{ id: string }, {}, { rating: number }>,
    res: Response,
  ) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const rating = req.body.rating;

      const result = await documentService.rate(id, userId, rating);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: {
          rating: {
            myRating: rating,
            sum: result.ratingSum,
            count: result.ratingCount,
          },
        },
      });
    } catch (err) {
      logger.error(err, "Document Controller: ");
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error while rating documents",
      });
    }
  },
  getBookmarkedDocuments: async (req: Request, res: Response) => {
    try {
      const userId = req.user.id;
      const documents = await documentService.getBookmarkedDocuments(userId);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: {
          documents,
        },
      });
    } catch (err) {
      logger.error(err, "Document Controller: ");
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error while getting bookmarked documents",
      });
    }
  },
  isBookmark: async (req: Request<{ documentId: string }>, res: Response) => {
    try {
      const userId = req.user.id;
      const { documentId } = req.params;

      const isBookmarked = await documentService.isBookmark(documentId, userId);

      res.set("Cache-Control", "no-store");
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: {
          isBookmarked,
        },
      });
    } catch (err) {
      logger.error(err, "Document Controller");
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error while checking bookmark document.",
      });
    }
  },
  bookmark: async (
    req: Request<{}, {}, { documentId: string }>,
    res: Response,
  ) => {
    try {
      const { documentId } = req.body;
      const userId = req.user.id;
      const isBookmarked = await documentService.bookmark(documentId, userId);

      res.set("Cache-Control", "no-store");
      res.status(HTTP_STATUS.OK).json({
        success: true,
        data: {
          isBookmarked,
        },
      });
    } catch (err) {
      logger.error(err, "Document Controller: ");
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error while bookmarking document.",
      });
    }
  },

  deleteDocumentById: async (
    req: Request<{ documentId: string }>,
    res: Response,
  ) => {
    try {
      const { documentId } = req.params;
      if (!documentId) {
        logger.warn("Missing document id");
      }
      await documentService.deleteDocument(documentId);

      res.status(200).json({
        success: true,
        message: "Document deleted successfully.",
      });

      logger.info({ documentId }, "Document deleted successfully.");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);

      res.status(500).json({
        success: false,
        message: "An error occurred while deleting the document.",
        error: errorMessage,
      });

      logger.error(error, "Error during document deletion.");
    }
  },

  getAllDocuments: async (_req: Request, res: Response) => {
    const documents = await documentService.getAllDocuments();

    res.status(HTTP_STATUS.OK).json({
      success: true,
      documents: documents,
    });
  },

  getDocumentById: async (req: Request<{ id: string }>, res: Response) => {
    const { id } = req.params;
    const document = await documentService.getDocumentById(id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      document: document,
    });
  },

  downloadAll: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;

      const archive = await archiveService.createDocumentZip(id);
      res.setHeader("Content-Type", "application/zip");
      res.setHeader("Content-Disposition", `attachment; filename="${id}.zip"`);

      archive.on("error", (err) => {
        logger.error(err, "Archive");

        if (!res.headersSent) {
          res.status(500).json({
            success: false,
            message: "Error while creating ZIP.",
          });
        } else {
          res.destroy(err);
        }
      });

      archive.pipe(res);

      await archive.finalize();
      await documentService.increaseDownloandCount(id);
    } catch (err) {
      logger.error(err, "Document Controller");

      if (!res.headersSent) {
        return res.status(500).json({
          success: false,
          message: "Error while downloading documents.",
        });
      }

      res.destroy(err as Error);
    }
  },
};
