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

router.post("/bookmark", documentsController.bookmark);
router.post("/:id/rating", documentsController.rateDocument);

router.get("/:documentId/bookmark", documentsController.isBookmark);
router.get("/bookmarked", documentsController.getBookmarkedDocuments);
router.get("/all", documentsController.getAllDocuments);
router.get("/:id", documentsController.getDocumentById);
router.get("/:id/download-all", documentsController.downloadAll);

router.delete("/:documentId", documentsController.deleteDocumentById);

// DELETE /api/documents/:documentId/rating
// POST   /api/documents/:documentId/rating
// GET    /api/documents/:documentId/rating

export default router;
