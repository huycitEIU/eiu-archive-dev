import {
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3Client.js";
import logger from "../utils/logger.js";

/**
 * Generates a pre-signed URL for uploading a file to S3.
 * @param {string} fileName - The name of the file to be uploaded.
 * @param {string} fileType - The MIME type of the file.
 * @returns {Promise<string>} - A promise that resolves to the pre-signed URL.
 */
const generateUploadPresignedUrl = async (
  fileName: string,
  fileType: string,
) => {
  try {
    const command = new PutObjectCommand({
      Bucket: process.env.STORAGE_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 900,
    });
    return url;
  } catch (error) {
    logger.error(error, "Error generating pre-signed URL:");
    throw new Error("Could not generate pre-signed URL");
  }
};

const generateDownloadPresignedUrl = async (
  fileKey: string,
  fileName: string,
  fileType: string,
) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.STORAGE_BUCKET_NAME,
      Key: fileKey,
      ResponseContentDisposition: `attachment; filename="${fileName}"`,
      ResponseContentType: fileType,
    });

    const url = await getSignedUrl(s3Client, command, {
      expiresIn: 900,
    });
    return url;
  } catch (error) {
    logger.error(error, "Error generating pre-signed URL:");
    throw new Error("Could not generate pre-signed URL");
  }
};

const deleteFile = async (objectKey: string) => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: process.env.STORAGE_BUCKET_NAME,
      Key: objectKey,
    });

    await s3Client.send(command);
    logger.info(`Delete file (${objectKey}) from storage successfully!`);
  } catch (error) {
    logger.error(error, "Error deleting file from storage.");
    throw new Error("An error while deleting files from storage.");
  }
};

async function listFilesByDocumentId(documentId: string) {
  const command = new ListObjectsV2Command({
    Bucket: process.env.STORAGE_BUCKET_NAME,
    Prefix: `${documentId}/`,
  });
  const result = await s3Client.send(command);
  return result.Contents ?? [];
}

async function getFileStream(objectKey: string) {
  const command = new GetObjectCommand({
    Bucket: process.env.STORAGE_BUCKET_NAME,
    Key: objectKey,
  });
  const result = await s3Client.send(command);

  return result.Body;
}

export const storageService = {
  generateDownloadPresignedUrl,
  generateUploadPresignedUrl,
  deleteFile,
  listFilesByDocumentId,
  getFileStream,
};
