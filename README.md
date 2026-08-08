# EIU Archive

This is a group project for the course **CSW 303 - Software Engineering** at **Eastern International University**. The project is a web application that allows users to upload, manage, and share documents.

## Tech Stack

- **Language**: TypeScript, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL, Prisma ORM
- **Frontend**: React.js, Vite, Ant Design
- **Object Storage**: Cloudflare R2
- **Authentication**: JWT
- **Hosting**: Render.com (backend), Vercel (frontend)
- **Database Hosting**: Aiven

## Project Structure

```
client/
│
├── src/
│   ├── components/
|   ├── hooks/
|   ├── layouts/
│   ├── pages/
│   ├── services/
|   ├── routes/
│   ├── types/
│   ├── utils/
│   ├── App.tsx
│   └── main.tsx
│
```

```
server/
│
├── src/
│   ├── config/
|   ├── constants/
│   ├── controllers/
│   ├── services/
│   ├── repositories/
│   ├── middlewares/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── server.js
|
├── tests/
```

## Design Principles

- Separation of Concerns (SoC)
- Single Responsibility Principle (SRP)
- Layered Architecture
- RESTful API Design
- Stateless Authentication using JWT

## Setup Instructions

### Frontend

1. Navigate to the `client` directory.
2. Install dependencies: `npm install`
3. Create a `.env` file in the `client` directory and add the following:

```
VITE_API_URL=https://eiu-archive-dev.onrender.com
```

4. Start the development server: `npm run dev`

### Backend

1. Navigate to the `server` directory.
2. Install dependencies: `npm install`
3. Create a `.env` file in the `server` directory and add the following:

```
DATABASE_URL="mysql://username:password@host:port/database"
JWT_SECRET="your_jwt_secret"
CLOUDFLARE_ACCOUNT_ID="your_cloudflare_account_id"
CLOUDFLARE_ACCESS_KEY_ID="your_cloudflare_access_key_id"
CLOUDFLARE_SECRET_ACCESS_KEY="your_cloudflare_secret_access_key"
```

4. Create the database and run migrations:

```
npx prisma migrate dev --name init
```

or for a quick setup without migrations, you can use:

```
npx prisma db push
```

5. Start the backend server: `npm run dev`

## Testing

To run the tests, navigate to the `server` directory and execute:

```
npm test
```
