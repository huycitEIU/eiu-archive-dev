import express from "express";
import { fileController } from "../controllers/fileController.js";

const router = express.Router();

router.get("/:id/download", fileController.getDownloadUrlById);

router.post("/upload", fileController.generateUploadUrls);
router.post("/confirm-upload", fileController.confirmUpload);

export default router;
