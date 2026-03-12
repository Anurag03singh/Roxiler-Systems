@echo off
echo 🚀 Setting up Modak-Cafe Store Rating System...

REM Start PostgreSQL
echo 📦 Starting PostgreSQL with Docker...
docker-compose up -d

REM Wait for PostgreSQL
echo ⏳ Waiting for PostgreSQL to be ready...
timeout /t 5 /nobreak

REM Setup Backend
echo 🔧 Setting up Backend...
cd backend

REM Copy env file
if not exist .env (
    copy .env.example .env
    echo ✅ Created backend .env file
)

REM Install dependencies
echo 📥 Installing backend dependencies...
call npm install

REM Generate Prisma Client
echo 🔨 Generating Prisma Client...
call npx prisma generate

REM Run migrations
echo 🗄️ Running database migrations...
call npx prisma migrate dev --name init

REM Seed database
echo 🌱 Seeding database...
call npx prisma db seed

echo ✅ Backend setup complete!

REM Setup Frontend
cd ..\frontend
echo 🎨 Setting up Frontend...

REM Copy env file
if not exist .env (
    copy .env.example .env
    echo ✅ Created frontend .env file
)

REM Install dependencies
echo 📥 Installing frontend dependencies...
call npm install

echo ✅ Frontend setup complete!

cd ..

echo.
echo 🎉 Setup Complete!
echo.
echo To start the application:
echo 1. Backend:  cd backend ^&^& npm run start:dev
echo 2. Frontend: cd frontend ^&^& npm run dev
echo.
echo Default Admin Login:
echo Email: admin@modak-cafe.com
echo Password: Admin@123
echo.
echo Backend: http://localhost:3000/api
echo Frontend: http://localhost:5173

pause
