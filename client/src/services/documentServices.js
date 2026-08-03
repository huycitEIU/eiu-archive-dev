import axios from "axios";

const getDocumentList = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/documents/list", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching document list:", error);
        throw error;
    }
};

const getCategories = async () => {
    try {
        const response = await axios.get("http://localhost:3000/api/documents/categories", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error("Error fetching document categories:", error);
        throw error;
    }
};

const getFilesByDocumentId = async (documentId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/documents/${documentId}/files`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching files for document ID ${documentId}:`, error);
        throw error;
    }
};

const createDocument = async (documentData) => {
    try {
        const response = await axios.post("http://localhost:3000/api/documents/create", documentData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error creating document:", error);
        throw error;
    }
};

const uploadDocument = async (documentId, files) => {
    try {
        const response = await axios.post(
            "http://localhost:3000/api/documents/upload",
            { documentId, files },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error uploading document:", error);
        throw error;
    }
};

const getDocumentsByUserId = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/documents/${userId}/documents`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    } catch (error) {
        console.error(`Error fetching documents for user ID ${userId}:`, error);
        throw error;
    }
};

export {
    getCategories,
    getDocumentList,
    getFilesByDocumentId,
    createDocument,
    uploadDocument,
    getDocumentsByUserId
};
