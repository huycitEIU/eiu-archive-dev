import { getUPloadPresignedUrl } from "../services/s3Service.js";

const getPresignedUrl = async (req, res) => {
    try {
        const { fileName, fileType } = req.body;

        if (!fileName || !fileType) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters: fileName and fileType.",
            });
        }

        const fileKey = `documents/${Date.now()}-${fileName}`;

        const presignedUrl = await getUPloadPresignedUrl(fileKey, fileType);

        res.status(200).json({
            success: true,
            message: "Pre-signed URL generated successfully.",
            data: presignedUrl,
        });
    } catch (error) {
        console.error("Error generating pre-signed URL:", error);
        res.status(500).json({
            success: false,
            message: "An error occurred while generating the pre-signed URL.",
            error: error.message,
        });
    }
};

export { getPresignedUrl };