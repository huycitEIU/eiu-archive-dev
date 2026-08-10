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

import { documentsController } from "../controllers/documentsController.js";

const router = express.Router();

router.post("/create", createDocument);
router.post("/upload", uploadDocument);

router.get("/list", getDocuments);
router.get("/:userId/documents", getDocumentsByUserId);
router.get("/categories", getDocumentCategories);
router.get("/:documentId/files", getFilesByDocumentId);
router.all("/:fileId/download", downloadFileById);

router.get("/all", documentsController.getAllDocuments);

router.delete("/:documentId", documentsController.deleteDocumentById);

export default router;
