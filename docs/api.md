# API List

## User

### Login

API: `api/auth/login`

```json
{
  "username": "username",
  "password": "password"
}
```

### Register

API: `api/auth/register`

```json
{
  "username": "username",
  "email": "email@eiu.edu.vn",
  "password": "password"
}
```

### Edit Profile

API: `api/auth/edit`

```json
// Chưa có api
```

## Documents

### Upload

Note: `fileSize` có đơn vị là Byte

#### Client -> Server

**POST**: `/api/documents/upload`

API này sẽ yêu cầu `Web Server` tạo mới một document trong `Database`, để có được `documentId` và danh sách `Presigned URL`.

```json
{
  "title": "title",
  "description": "description",
  "category": "category",
  "files": [
    {
      "fileName": "file1",
      "fileType": "application/type",
      "fileSize": 123
    },
    {
      "fileName": "file2",
      "filetype": "application/type",
      "fileSize": 123
    }
    //...
  ]
}
```

#### Server -> Client:

Server sẽ trả về `documentId` và `URL` cần thiết. `Client` dùng chúng để tải trức tiếp tệp tin từ thiết bị lên `Storage`.

```json
{
  "documentId": "UUID",
  "uploadTargets": [
    {
      "fileName": "file1",
      "uploadUrl": "https://..."
    },
    {
      "fileName": "file2",
      "uploadUrl": "https://..."
    }
    //...
  ]
}
```

#### Client -> Server

**POST**: `api/documents/upload/complete`

Xác nhận với `Web Server` để hoàn tất việc tải lên document. Đồng thời lưu thông tin các `File` của `Document` trong `Database`.

```json
{
  "documentId": "UUID",
  "files": [
    {
      "fileName": "name",
      "fileUrl": "url",
      "fileType": "type",
      "fileSize": 123
    },
    {
      "fileName": "name",
      "fileUrl": "url",
      "fileType": "type",
      "fileSize": 123
    }
    //...
  ]
}
```

##### Result:

`Server` trả về kết quả sau khi upload thành công.

```json
{
  "success": true,
  "message": "Document has been uploaded successfully",
  "document": {
    "documentId": "UUID",
    "title": "string",
    "description": "string",
    "category": "string",
    "files": [
      {
        "fileId": "1",
        "fileName": "name",
        "fileUrl": "url",
        "fileType": "type",
        "createdAt": "2026-07-30",
        "fileSize": 123
      },
      {
        "fileId": "2",
        "fileName": "name",
        "fileUrl": "url",
        "fileType": "type",
        "createdAt": "2026-07-30",
        "fileSize": 123
      }
      // ...
    ]
  }
}
```

##### Unsuccessful

Kết quả trả về khi xảy ra lỗi.

```json
{
  "success": false,
  "message": "Error when uploading document"
}
```

### Download

### Edit

## Comment

### Create

### Delete

### Edit
