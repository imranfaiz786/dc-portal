# DC Portal — Backend (API)

This is the **Node.js + Express** backend for the **DC Portal** website. It provides **JWT authentication**, department data APIs (Livestock, Education, Health, Agriculture, Water, Public Works), and report endpoints.

## Tech

- **Runtime**: Node.js  
- **Framework**: Express
- **Database**: MongoDB (Atlas) via **Mongoose**
- **Auth**: JWT (`jsonwebtoken`) + password hashing (`bcrypt`)
- **Other**: `cors`, `dotenv`

## Setup

Install dependencies:

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
PORT=5002
JWT_SECRET=your-strong-secret
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-host>/<dbName>?retryWrites=true&w=majority
```

Notes:
- `MONGO_URI` must start with **`mongodb+srv://`** for Atlas.
- If your password has special characters, **URL-encode** it.

## Run

Development (auto-reload):

```bash
npm run dev
```

Production:

```bash
npm start
```

The server listens on `PORT` (default fallback is `5000` in code).

## API Routes

Base URL: `http://localhost:<PORT>`

### Auth

- **POST** `/api/auth/signup`  
  Body: `{ "name": "...", "email": "...", "role": "admin|user", "password": "..." }`

- **POST** `/api/auth/signin`  
  Body: `{ "email": "...", "password": "..." }`  
  Response: `{ "token": "..." }`

### Departments

All routes are under `/api/departments`.

- **Livestock** (currently not protected in routes)
  - **GET** `/livestock`
  - **POST** `/livestock`

- **Education** (protected)
  - **GET** `/education` *(requires `Authorization: Bearer <token>`)*  
  - *(Education create is used by the frontend via POST `/api/departments/education` — if your frontend needs it and it’s missing, add the route/controller accordingly.)*

- **Health** (protected)
  - **GET** `/health`
  - **POST** `/health`

- **Agriculture** (protected)
  - **GET** `/agriculture`
  - **POST** `/agriculture`

- **Water & Sanitation** (protected)
  - **GET** `/water`
  - **POST** `/water`

- **Public Works** (protected)
  - **GET** `/public-works`
  - **POST** `/public-works`

## Auth Header

For protected routes, send:

```http
Authorization: Bearer <JWT_TOKEN>
```

## Seeding (Sample Data)

This repo contains two seed scripts:

- `backend/seed.js` — seeds Livestock, Education (Teacher), Health, Agriculture, and also Police/LGCD mapped into `PublicWorksProject` using `projectType`.
- `backend/scripts/seed.js` — older seed script that clears and reseeds multiple collections.

Run:

```bash
node seed.js
```

or

```bash
npm run seed
```

## Folder Structure

```
backend/
├── config/           # DB connection (Mongoose)
├── controllers/      # Request handlers
├── middleware/       # Auth middleware (JWT verify)
├── models/           # Mongoose schemas
├── routes/           # Express routes
├── scripts/          # Additional scripts (older seed)
├── seed.js           # Main seed script
└── server.js         # Express entrypoint
```

