export interface Document {
    id: string,
    title: string,
    description: string,
    categoryId: string,
    userId: string,
    createdAt: Date,
    updatedAt: Date
}

export interface CreateDocumentRequestBody {
    title: string,
    description: string,
    categoryId: string,
    files: {
        name: string,
        type: string
    }[]
}

export interface UploadDocumentRequestBody {
    documentId: string,
    files: {
        name: string,
        type: string,
        size: number,
        objectKey: string,
        url: string
    }[]
}


export interface UpdateDocumentData {
    title?: string,
    description?: string,
    categoryId?: string
}

export interface InsertDocumentData {
    title: string,
    description: string,
    categoryId: string,
    userId: string
}

