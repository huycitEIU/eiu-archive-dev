import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "../config/s3Client.js";
import logger from "../utils/logger.js";

/**
 * Generates a pre-signed URL for uploading a file to S3.
 * @param {string} fileName - The name of the file to be uploaded.
 * @param {string} fileType - The MIME type of the file.
 * @returns {Promise<string>} - A promise that resolves to the pre-signed URL.
 */
const generateUploadPresignedUrl = async (fileName, fileType) => {
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
        logger.error("Error generating pre-signed URL:", error);
        throw new Error("Could not generate pre-signed URL");
    }
};

const generateDownloadPresignedUrl = async (fileKey, fileName, fileType) => {
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
        logger.error("Error generating pre-signed URL:", error);
        throw new Error("Could not generate pre-signed URL");
    }
};

export { generateUploadPresignedUrl, generateDownloadPresignedUrl };