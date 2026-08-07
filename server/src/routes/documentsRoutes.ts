import express from "express";
import {
  createDocument,
  uploadDocument,
  getDocuments,
  getDocumentsByUserId,
  getDocumentCategories,
  getFilesByDocumentId,
  downloadFileById,
} from "../controllers/documentsController.js";

const router = express.Router();

router.post("/document/create", createDocument);
router.post("/document/upload", uploadDocument);
router.get("/document/list", getDocuments);
router.get("/document/:userId/documents", getDocumentsByUserId);
router.get("/document/categories", getDocumentCategories);
router.get("/document/:documentId/files", getFilesByDocumentId);
router.all("/document/:fileId/download", downloadFileById);

export default router;
