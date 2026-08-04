export interface File {
    id: string,
    name: string,
    type: string,
    size: number,
    objectKey: string,
    url: string,
    documentId: string,
    createdAt: Date,
    updatedAt: Date
}

export interface InsertFileData {
    name: string,
    type: string,
    size: number,
    objectKey: string,
    url: string
}