import axios from "axios";
import type { Document, CreateDocumentData } from "../types/document";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const documentService = {
  createDocument: async (document: CreateDocumentData): Promise<string> => {
    try {
      const res = await axios.post(`${API_URL}/api/document/create`, document, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data.document.id;
    } catch (err) {
      throw err;
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
  getDocumentById: async (id: string): Promise<Document> => {
    try {
      const res = await axios.get(`${API_URL}/api/document/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      return res.data.document;
    } catch (error) {
      throw new Error("Failed to fetch document information.");
    }
  },
};

export default documentService;
