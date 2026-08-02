# Server Documentation

## Overview

This project is the backend of a **Document Storage and Sharing System**. It exposes RESTful APIs for user authentication, document management, file upload/download, and document sharing.

The backend is developed using **Node.js** and **Express.js**, with **Prisma ORM** for database access and **Cloudflare R2** for object storage.

---

# Architecture

The backend follows a **Layered Architecture**, which is an API-oriented variation of the MVC (Model–View–Controller) architectural pattern.

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
PostgreSQL
        +
Cloudflare R2
```

## Layer Responsibilities

### Routes

- Define API endpoints.
- Map incoming HTTP requests to controllers.
- Apply middleware when necessary.

Example:

```
POST /api/auth/login
        │
        ▼
authController.login()
```

---

### Middlewares

Middlewares process requests before they reach controllers.

Typical responsibilities include:

- JWT authentication
- Authorization
- Request validation
- File upload handling
- Error handling
- Logging

---

### Controllers

Controllers handle HTTP requests and responses.

Responsibilities:

- Read request parameters
- Validate basic input
- Call business services
- Return HTTP responses

Controllers **should not contain business logic or database queries**.

---

### Services

Services contain the application's business logic.

Examples:

- User authentication
- Permission checking
- Document sharing
- Folder management
- File processing

Services coordinate repositories and external services.

---

### Repositories

Repositories are responsible for data access.

Responsibilities:

- Query PostgreSQL through Prisma
- Save document metadata
- Retrieve user information
- Communicate with Cloudflare R2 for file storage

Repositories should not implement business rules.

---

### Models

Models represent the application's data structure.

In this project, models are primarily defined using **Prisma Schema**.

Examples:

- User
- Document
- Folder
- Permission

---

# Request Flow

## Example: Upload Document

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
      (document file)
```

Processing steps:

1. Client uploads a file.
2. Route forwards the request.
3. Authentication middleware verifies the user.
4. Controller validates the request.
5. Service checks permissions and business rules.
6. Repository uploads the file to Cloudflare R2.
7. Repository stores document metadata in PostgreSQL.
8. Controller returns the response.

---

# Project Structure

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
│   └── Business logic
│
├── repositories/
│   └── Database and storage access
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
│
└── server.js
```

---

# Design Principles

The backend follows these principles:

- Separation of Concerns (SoC)
- Single Responsibility Principle (SRP)
- Layered Architecture
- RESTful API Design
- Stateless Authentication using JWT

---

# Technologies

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

# Best Practices

Controllers should:

- Handle requests and responses only.
- Never access the database directly.

Services should:

- Implement business logic.
- Be reusable.

Repositories should:

- Only communicate with data sources.
- Never contain business logic.

Middlewares should:

- Be reusable.
- Handle cross-cutting concerns.

---

# Future Improvements

Possible future enhancements include:

- API versioning
- Background job processing
- Caching
- Full-text search
- Document versioning
- Audit logging
- Notification service
- Microservice migration
