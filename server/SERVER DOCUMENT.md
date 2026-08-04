# Server Documentation

## Target Architecture

## Overview

This project is the backend of a **Document Storage and Sharing System**. It exposes RESTful APIs for user authentication, document management, file upload/download, and document sharing.

The backend is built with **Node.js** and **Express.js**, uses **Prisma ORM** for database access, **MySQL** as the relational database, and **Cloudflare R2** for object storage.

This document describes the **target architecture** the project should move toward. The current codebase may still contain logic in controllers while the project is being refactored.

---

## Architecture

The backend follows a **layered architecture**, which is an API-oriented variation of the MVC (Model-View-Controller) pattern.

Each layer has a single responsibility.

```
Client
    │
    ▼
Routes
    │
    ▼
Middlewares
    │
    ▼
Controllers
    │
    ▼
Services
    │
    ▼
Repositories
    │
    ▼
Prisma ORM
    │
    ▼
MySQL
    │
    └──────────────► Cloudflare R2
```

### Layer Responsibilities

#### Routes

- Define API endpoints.
- Map incoming HTTP requests to controllers.
- Apply middleware when needed.

Example:

```
POST /api/auth/login
        │
        ▼
authController.login()
```

#### Middlewares

Middlewares process requests before they reach controllers.

Typical responsibilities include:

- JWT authentication
- Authorization
- Request validation
- File upload handling
- Error handling
- Logging

#### Controllers

Controllers handle HTTP requests and responses.

Responsibilities:

- Read request parameters
- Validate basic input
- Call services
- Return HTTP responses

Controllers should stay thin and avoid business logic.

#### Services

Services contain application business logic.

Examples:

- User authentication
- Permission checking
- Document sharing
- Folder management
- File processing

Services coordinate repositories and external adapters such as Cloudflare R2.

#### Repositories

Repositories are responsible for data access.

Responsibilities:

- Query MySQL through Prisma
- Save document metadata
- Retrieve user information
- Read and write domain records

Repositories should not implement business rules.

#### External Services / Adapters

For integrations that are not database access, keep them in dedicated services or adapters.

Examples:

- Cloudflare R2 upload/download helpers
- Pre-signed URL generation
- File storage operations

#### Models

Models represent the application's data structure.

In this project, models are primarily defined using **Prisma Schema**.

Examples:

- User
- Document
- Folder
- Permission

---

## Request Flow

### Example: Upload Document

```
Client

POST /documents/upload

        │

Routes

        │

Authentication Middleware

        │

Document Controller

        │

Document Service

        │

Document Repository

        │

───────────────┬────────────────
               │
               ▼
             MySQL
          (metadata)

               │
               ▼
        Cloudflare R2
        (file storage)
```

Processing steps:

1. Client sends an upload request.
2. Route forwards the request.
3. Authentication middleware verifies the user.
4. Controller validates the request and extracts input.
5. Service checks permissions and applies business rules.
6. Repository stores document metadata in MySQL through Prisma.
7. Storage adapter uploads the file to Cloudflare R2 or generates a pre-signed URL.
8. Controller returns the response.

---

## Current Codebase Notes

This project is still early-stage, so some files may contain multiple responsibilities in one place.

Current implementation patterns may include:

- Controllers calling Prisma directly.
- Storage helpers living inside service files.
- Missing repository files for some features.

That is acceptable during development, but the long-term goal is to move toward the layered structure above.

---

## Project Structure

```
src/
│
├── config/
│   └── Configuration files
│
├── controllers/
│   └── Handle HTTP requests and responses
│
├── services/
│   └── Business logic and external integrations
│
├── repositories/
│   └── Database access
│
├── middlewares/
│   └── Authentication, validation, logging
│
├── routes/
│   └── API route definitions
│
├── utils/
│   └── Helper functions
│
├── app.js
└── server.js
```

---

## Design Principles

The backend follows these principles:

- Separation of Concerns (SoC)
- Single Responsibility Principle (SRP)
- Layered Architecture
- RESTful API Design
- Stateless Authentication using JWT

---

## Technologies

| Technology    | Purpose             |
| ------------- | ------------------- |
| Node.js       | Runtime environment |
| Express.js    | Web framework       |
| Prisma ORM    | Database access     |
| MySQL         | Relational database |
| Cloudflare R2 | Object storage      |
| JWT           | Authentication      |
| Multer        | File upload         |
| bcrypt        | Password hashing    |

---

## Best Practices

Controllers should:

- Handle requests and responses only.
- Avoid direct database access.

Services should:

- Implement business logic.
- Be reusable.
- Coordinate repositories and storage adapters.

Repositories should:

- Only communicate with data sources.
- Never contain business logic.

Middlewares should:

- Be reusable.
- Handle cross-cutting concerns.

---

## Refactoring Plan

When you move the code gradually, a practical order is:

1. Move Prisma queries out of controllers into repositories.
2. Keep controllers thin and only responsible for HTTP input/output.
3. Move business rules into services.
4. Keep Cloudflare R2 logic in a storage service or adapter.
5. Add repository files feature by feature instead of refactoring everything at once.

---

## Future Improvements

Possible future enhancements include:

- API versioning
- Background job processing
- Caching
- Full-text search
- Document versioning
- Audit logging
- Notification service
- Microservice migration
