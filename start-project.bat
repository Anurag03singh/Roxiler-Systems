@echo off
echo.
echo ========================================
echo   Modak-Cafe Project Startup
echo ========================================
echo.

REM Check if Docker is running
echo [1/7] Checking Docker...
docker ps >nul 2>&1
if errorlevel 1 (
    echo ❌ Docker Desktop is not running!
    echo.
    echo Please start Docker Desktop first, then run this script again.
    echo.
    pause
    exit /b 1
)
echo ✅ Docker is running

REM Start PostgreSQL
echo.
echo [2/7] Starting PostgreSQL...
docker-compose up -d
timeout /t 5 /nobreak >nul

REM Generate Prisma Client
echo.
echo [3/7] Generating Prisma Client...
cd backend
call npx prisma generate

REM Run migrations
echo.
echo [4/7] Running database migrations...
call npx prisma migrate dev --name init

REM Seed database
echo.
echo [5/7] Seeding database...
call npx prisma db seed

echo.
echo [6/7] Starting backend server...
echo Backend will run on: http://localhost:3000/api
echo.
start cmd /k "cd /d %~dp0backend && npm run start:dev"

timeout /t 3 /nobreak >nul

echo.
echo [7/7] Starting frontend...
echo Frontend will run on: http://localhost:5173
echo.
start cmd /k "cd /d %~dp0frontend && npm run dev"

echo.
echo ========================================
echo   🎉 Project Started Successfully!
echo ========================================
echo.
echo Backend:  http://localhost:3000/api
echo Frontend: http://localhost:5173
echo.
echo Test Credentials:
echo   Admin: admin@modak-cafe.com / Admin@123
echo   User:  user1@example.com / User@123
echo.
echo Press any key to exit this window...
pause >nul
