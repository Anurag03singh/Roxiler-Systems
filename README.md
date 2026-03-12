# Store Rating App

A web app for rating and managing stores with role-based access.

## Stack

- Backend: NestJS + PostgreSQL + Prisma
- Frontend: React + TypeScript + Tailwind CSS
- Auth: JWT

## Getting Started

### Prerequisites
- Node.js 18+
- Docker (for PostgreSQL)

### Setup

1. Start the database:
```bash
docker-compose up -d
```

2. Backend setup:
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

3. Frontend setup:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

The app will be running at `http://localhost:5173`

## Test Accounts

Admin: `admin@modak-cafe.com` / `Admin@123`
Store Owner: `owner@store1.com` / `Owner@123`
User: `user@example.com` / `User@123`

## Features

- User registration and authentication
- Browse and search stores
- Rate stores (1-5 stars)
- Admin dashboard with stats
- Store owner can view ratings
- Role-based access control
