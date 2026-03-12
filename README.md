# Rate My Store - Store Rating System

A complete fullstack web application for managing stores, users, and ratings with role-based access control.

## Tech Stack

- **Backend**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **Frontend**: React (TypeScript + Vite)
- **Authentication**: JWT + bcrypt
- **Styling**: Tailwind CSS + Headless UI
- **ORM**: Prisma

## Features

### Normal User
- Register and login
- Browse and search stores
- Rate stores (1-5 stars)
- Edit existing ratings
- Update password

### System Administrator
- Dashboard with statistics
- Add/manage stores and users
- Filter and sort all data
- View detailed information

### Store Owner
- View average store rating
- See all user ratings
- Update password

## Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- PostgreSQL (or use Docker)

### Installation

1. Clone the repository
2. Start PostgreSQL with Docker:
```bash
docker-compose up -d
```

3. Setup Backend:
```bash
cd backend
npm install
cp .env.example .env
npx prisma migrate dev
npx prisma db seed
npm run start:dev
```

4. Setup Frontend:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Default Credentials

### Admin
- Email: admin@modak-cafe.com
- Password: Admin@123

### Store Owner
- Email: owner@store1.com
- Password: Owner@123

### Normal User
- Email: user@example.com
- Password: User@123

## API Documentation

Base URL: `http://localhost:3000/api`

### Authentication
- POST `/auth/register` - Register new user
- POST `/auth/login` - Login
- POST `/auth/logout` - Logout
- GET `/auth/refresh` - Refresh token

### Stores
- GET `/stores` - List all stores (with search, sort, pagination)
- GET `/stores/:id` - Get store details
- POST `/stores` - Create store (Admin only)
- GET `/stores/:id/ratings` - Get store ratings

### Ratings
- POST `/ratings` - Create rating
- PUT `/ratings/:id` - Update rating
- GET `/ratings/my-ratings` - Get user's ratings

### Users (Admin)
- GET `/admin/users` - List users
- POST `/admin/users` - Create user
- GET `/admin/users/:id` - Get user details

### Dashboard
- GET `/dashboard/stats` - Get dashboard statistics

## Project Structure

```
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.ts
│   ├── src/
│   │   ├── auth/
│   │   ├── users/
│   │   ├── stores/
│   │   ├── ratings/
│   │   ├── common/
│   │   └── app.module.ts
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── utils/
│   └── package.json
└── docker-compose.yml
```

## Environment Variables

### Backend (.env)
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/modak_cafe"
JWT_SECRET="your-secret-key"
JWT_EXPIRES_IN="7d"
PORT=3000
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

## License

MIT
