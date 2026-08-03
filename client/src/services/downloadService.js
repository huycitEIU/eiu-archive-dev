import axios from "axios";

const responseType = "blob"; // Set the response type to 'blob' for file downloads

const downloadFile = async (fileId) => {
    try {
        const response = await axios.get(
            `http://localhost:3000/api/documents/${fileId}/download`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // Include the JWT token in the request headers
                },
            }
        );

        console.log("Download response:", response.data); // Log the entire response for debugging

        const presignedUrl = response.data.data.url;

        console.log("Presigned URL:", presignedUrl); // Log the presigned URL for debugging

        window.open(presignedUrl, "_blank"); // Open the presigned URL in a new tab for download

    } catch (error) {
        console.error("Error downloading file:", error);
        throw error; // Rethrow the error to be handled by the caller
    }
};

export {
    downloadFile
};