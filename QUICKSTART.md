# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ installed
- Docker installed (for PostgreSQL)
- Git installed

## Installation (5 minutes)

### Windows Users
```bash
# Run the automated setup
setup.bat
```

### Linux/Mac Users
```bash
# Make script executable and run
chmod +x setup.sh
./setup.sh
```

## Manual Installation

If automated setup fails, follow these steps:

### 1. Start Database (30 seconds)
```bash
docker-compose up -d
```

### 2. Setup Backend (2 minutes)
```bash
cd backend
npm install
cp .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### 3. Setup Frontend (1 minute)
```bash
cd frontend
npm install
cp .env.example .env
```

## Running the Application

### Terminal 1 - Backend
```bash
cd backend
npm run start:dev
```
Backend runs on: http://localhost:3000/api

### Terminal 2 - Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: http://localhost:5173

## Test the Application

1. Open http://localhost:5173
2. Click "Login"
3. Use these credentials:

**Admin Account:**
- Email: `admin@modak-cafe.com`
- Password: `Admin@123`

**Normal User:**
- Email: `user1@example.com`
- Password: `User@123`

**Store Owner:**
- Email: `owner@store1.com`
- Password: `Owner@123`

## What's Working

### ✅ Backend (100%)
- All API endpoints functional
- Authentication with JWT
- Role-based access control
- Database with seed data
- Input validation
- Security features

### ✅ Frontend (70%)
- Landing page
- Login/Register
- Dashboard (role-based)
- Stores listing
- Profile management
- Protected routes

## What Needs Work

### Frontend To-Do
- Admin management pages (stores/users)
- Store owner ratings dashboard
- Rating modal component
- Sorting/filtering UI
- Statistics dashboard
- Better mobile responsiveness

## API Testing

You can test the API directly:

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@modak-cafe.com","password":"Admin@123"}' \
  -c cookies.txt
```

### Get Stores
```bash
curl http://localhost:3000/api/stores \
  -b cookies.txt
```

### Create Rating (as user)
```bash
curl -X POST http://localhost:3000/api/ratings \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{"storeId":"00000000-0000-0000-0000-000000000001","rating":5}'
```

## Database Access

View your database:
```bash
cd backend
npx prisma studio
```

Opens at: http://localhost:5555

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000 (backend)
npx kill-port 3000

# Kill process on port 5173 (frontend)
npx kill-port 5173
```

### Database Connection Error
```bash
# Restart PostgreSQL
docker-compose restart

# Check if running
docker ps
```

### Prisma Issues
```bash
cd backend
npx prisma generate
npx prisma migrate reset
npx prisma db seed
```

### Clear Everything and Start Fresh
```bash
# Stop all
docker-compose down -v

# Remove node_modules
rm -rf backend/node_modules frontend/node_modules

# Run setup again
./setup.sh  # or setup.bat on Windows
```

## Project Structure

```
├── backend/          # NestJS API
│   ├── prisma/      # Database schema & seed
│   └── src/         # Source code
├── frontend/         # React app
│   └── src/         # Source code
└── docker-compose.yml
```

## Next Steps

1. ✅ Run setup script
2. ✅ Test login with provided credentials
3. ✅ Explore the dashboard
4. ✅ Test API endpoints
5. 🚧 Implement remaining frontend features
6. 🚧 Add more comprehensive tests
7. 🚧 Deploy to production

## Need Help?

- Check SETUP.md for detailed instructions
- Check IMPLEMENTATION_STATUS.md for what's done
- Check README.md for API documentation

## Success Checklist

- [ ] PostgreSQL running (docker ps shows container)
- [ ] Backend running on port 3000
- [ ] Frontend running on port 5173
- [ ] Can login with admin credentials
- [ ] Can see stores list
- [ ] Can update password
- [ ] Database has seed data (check Prisma Studio)

If all checked, you're ready to go! 🎉
