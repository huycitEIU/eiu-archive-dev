import { ZipArchive } from "archiver";
import { storageService } from "./storageService.js";
import Stream from "node:stream";

async function createDocumentZip(documentId: string) {
  const objects = await storageService.listFilesByDocumentId(documentId);

  const archive = new ZipArchive({
    zlib: { level: 6 },
  });

  for (const object of objects) {
    if (!object.Key) continue;

    const body = await storageService.getFileStream(object.Key);

    if (!body) continue;

    const fileName = object.Key.split("/").pop();

    if (!fileName) continue;

    archive.append(body as Stream.Readable, {
      name: fileName,
    });
  }

  return archive;
}

export const archiveService = {
  createDocumentZip,
};
