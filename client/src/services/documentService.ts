import axios from "axios";
import type { Document, UploadDocument } from "../types/document";
import type { UploadFile } from "../types/file";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const documentService = {
  createDocument: async (document: UploadDocument, files: UploadFile[]) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/document/create`,
        {
          ...document,
          files: files,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const documentId = response.data.data.documentId;
      const presignedUrls = response.data.data.presignedUrls;

      await Promise.all(
        files.map((file, index) => {
          const presignedUrl = presignedUrls[index].url;

          return axios.put(presignedUrl, file, {
            headers: {
              "Content-Type": file.type,
            },
          });
        }),
      );

      const uploadBody = {
        documentId: documentId,
        files: files.map((file, index) => ({
          name: file.name,
          size: file.size,
          type: file.type,
          url: presignedUrls[index].url.split("?")[0],
          objectKey: presignedUrls[index].objectKey,
        })),
      };

      console.log(uploadBody);

      await axios.post(`${API_URL}/api/document/upload`, uploadBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.log("Error while creating document.");
    }
  },

  getDocuments: async () => {
    try {
      const response = await axios.get(`${API_URL}/api/document/list`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const documents = response.data.data.map((doc: Document) => ({
        key: doc.id,
        id: doc.id,
        name: doc.title,
        category: doc.categoryId, // Adjust this based on your actual data structure
        createdAt: new Date(doc.createdAt).toLocaleDateString(),
      }));

      return documents;
    } catch (error) {
      throw new Error("Failed to fetch documents");
    }
  },

  deleteDocument: async (documentId: string) => {
    try {
      await axios.delete(`${API_URL}/api/document/${documentId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      throw new Error("Failed to delete document");
    }
  },

  getAllDocuments: async (): Promise<Document[]> => {
    try {
      const res = await axios.get(`${API_URL}/api/document/all`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data.documents;
    } catch (error) {
      throw new Error("Failed to get all documents.");
    }
  },
};

export default documentService;
