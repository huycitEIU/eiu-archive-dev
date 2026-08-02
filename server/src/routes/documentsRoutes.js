import express from "express";
import {
    createDocument,
    uploadDocument,
    getDocumentList,
    getDocumentCategories,
    getFilesByDocumentId,
} from "../controllers/documentsController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post('/create', authenticateToken, createDocument);
router.post('/upload', authenticateToken, uploadDocument);
router.get('/list', authenticateToken, getDocumentList);
router.get('/categories', authenticateToken, getDocumentCategories);
router.get('/:documentId/files', authenticateToken, getFilesByDocumentId);

export default router;