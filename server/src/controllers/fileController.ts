import type { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/httpStatus.js";
import { storageService } from "../services/storageService.js";
import { fileService } from "../services/fileService.js";
import logger from "../utils/logger.js";
import { InsertFileData } from "../types/file.js";
export const fileController = {
  getDownloadUrlById: async (req: Request<{ id: string }>, res: Response) => {
    try {
      const { id } = req.params;
      const file = await fileService.getFileById(id);
      const url = await storageService.generateDownloadPresignedUrl(
        file.objectKey,
        file.name,
        file.type,
      );
      res.status(HTTP_STATUS.OK).json({
        success: true,
        downloadUrl: url,
      });
    } catch (error) {
      res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error when get presigned url to download file.",
      });
    }
  },

  generateUploadUrls: async (
    req: Request<
      {},
      {},
      { documentId: string; files: { name: string; type: string }[] }
    >,
    res: Response,
  ) => {
    try {
      const documentId = req.body.documentId;
      const files = req.body.files;

      const uploadInfo = await Promise.all(
        files.map(async (file) => {
          const { name, type } = file;
          const objectKey = `${documentId}/${Date.now()}-${name}`;
          const uploadUrl = await storageService.generateUploadPresignedUrl(
            objectKey,
            type,
          );
          return {
            objectKey,
            uploadUrl,
          };
        }),
      );

      res.status(HTTP_STATUS.OK).json({
        success: true,
        files: uploadInfo,
      });
    } catch (err) {
      logger.error(err, "File Controller: ");
      throw new Error("Faild to generate upload urls");
    }
  },

  confirmUpload: async (
    req: Request<
      {},
      {},
      {
        documentId: string;
        files: InsertFileData[];
      }
    >,
    res: Response,
  ) => {
    try {
      const documentId = req.body.documentId;
      const files = req.body.files;
      console.log(files);
      await fileService.confirmUpload(documentId, files);

      res.status(HTTP_STATUS.OK).json({
        success: true,
        message: "Files confirmed successfully.",
      });
    } catch (err) {
      logger.error(err, "File Controller: ");
      throw new Error("Failed to confirm uploads");
    }
  },
};
