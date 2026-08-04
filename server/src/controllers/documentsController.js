import express from "express";
import prisma from "../config/prisma.js";
import { generateUploadPresignedUrl, generateDownloadPresignedUrl } from "../services/storageService.js";
import { insertDocument } from "../repositories/documentRepository.js";
import { insertFile } from "../repositories/fileRepository.js";

import logger from "../utils/logger.js";

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
const createDocument = async (req, res) => {
    try {
        const { title, description, categoryId, files } = req.body;
        const userId = req.user.id;

        if (files.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Vui lòng tải lên ít nhất một tệp.",
            });
        }

        const document = await insertDocument({
            title,
            description,
            categoryId,
            userId
        });

        // Request a pre-signed URL from the storage service for each file (this part is not implemented here, but you would typically call your storage service's SDK or API to get the URLs)
        const presignedUrls = await Promise.all(
            files.map(async (file) => {

                const uniqueFileName = `${Date.now()}-${file.name}`;

                const presignedUrl = await generateUploadPresignedUrl(uniqueFileName, file.type);
                return {
                    name: file.name,
                    url: presignedUrl,
                    objectKey: uniqueFileName, // Store the unique file name for later reference
                };
            })
        );

        // Return the pre-signed URLs to the client
        res.status(200).json({
            success: true,
            message: "Document metadata stored successfully. Pre-signed URLs generated.",
            data: {
                documentId: document.id,
                presignedUrls,
            },
        });

        logger.info({ documentId: document.id, title, description, categoryId, userId }, "Document metadata stored and pre-signed URLs generated successfully.");
    } catch (error) {
        logger.error(error, "Error during document creation.");
        res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi tạo tài liệu.",
            error: error.message,
        });
    }
};

const uploadDocument = async (req, res) => {
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
                return await insertFile(file, documentId);
            })
        );

        res.status(200).json({
            success: true,
            message: "Document upload completed successfully.",
        });

        logger.info({ documentId, files }, "Document upload completed successfully.");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while completing the document upload.",
            error: error.message,
        });

        logger.error(error, "Error during document upload.");
    }

};

const getDocumentList = async (req, res) => {
    try {
        const userId = req.user.userId;
        const documents = await prisma.document.findMany({
            where: { userId },
        });

        res.status(200).json({
            success: true,
            data: documents,
        });
    } catch (error) {
        logger.error("Error fetching user documents:", error);
        res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi lấy danh sách tài liệu.",
            error: error.message,
        });
    }
};

const getDocumentsByUserId = async (req, res) => {
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

        logger.info({ userId, documentCount: documents.length }, "Fetched documents for user successfully.");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching documents for the user.",
            error: error.message,
        });

        logger.error(error, "Error during fetching documents by userId.");
    }
}

const getDocumentCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();

        res.status(200).json({
            success: true,
            data: categories,
        });

        logger.info({ categoryCount: categories.length }, "Fetched document categories successfully.");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Đã xảy ra lỗi khi lấy danh sách danh mục tài liệu.",
            error: error.message,
        });

        logger.error(error, "Error during fetching document categories.");
    }
};

const getFilesByDocumentId = async (req, res) => {
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
            data: files,
        });

        logger.info({ documentId, fileCount: files.length }, "Fetched files for document successfully.");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while fetching files for the document.",
            error: error.message,
        });

        logger.error(error, "Error during fetching files by documentId.");
    }
};

const downloadFileById = async (req, res) => {
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
        const presignedUrl = await generateDownloadPresignedUrl(file.objectKey, file.name, file.type);

        res.status(200).json({
            success: true,
            data: {
                url: presignedUrl,
            },
        });

        logger.info({ fileId, objectKey: file.objectKey }, "Generated download URL for file successfully.");
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "An error occurred while generating the download URL.",
            error: error.message,
        });

        logger.error(error, "Error during generating download URL for file.");
    }
};

export {
    createDocument,
    uploadDocument,
    getDocumentList,
    getDocumentsByUserId,
    getDocumentCategories,
    getFilesByDocumentId,
    downloadFileById
};