@echo off
echo.
echo ========================================
echo   Supabase Setup for Modak-Cafe
echo ========================================
echo.

REM Check if Supabase URL is provided
if "%1"=="" (
    echo ❌ Error: Please provide your Supabase connection string
    echo.
    echo Usage: setup-supabase.bat "postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
    echo.
    echo To get your connection string:
    echo 1. Go to https://supabase.com
    echo 2. Open your project
    echo 3. Settings -^> Database -^> Connection string -^> URI
    echo.
    pause
    exit /b 1
)

echo [1/4] Updating DATABASE_URL in backend/.env...
cd backend

REM Create or update .env file
echo DATABASE_URL=%1 > .env.temp
echo JWT_SECRET="your-super-secret-jwt-key-change-this-in-production" >> .env.temp
echo JWT_EXPIRES_IN="7d" >> .env.temp
echo PORT=3000 >> .env.temp
echo NODE_ENV=development >> .env.temp

move /Y .env.temp .env >nul
echo ✅ Updated .env file

echo.
echo [2/4] Generating Prisma Client...
call npx prisma generate

echo.
echo [3/4] Running database migrations...
call npx prisma migrate dev --name init

echo.
echo [4/4] Seeding database...
call npx prisma db seed

echo.
echo ========================================
echo   ✅ Supabase Setup Complete!
echo ========================================
echo.
echo Your backend is now configured to use Supabase!
echo.
echo To start the application:
echo   Backend:  cd backend ^&^& npm run start
echo   Frontend: cd frontend ^&^& npm run dev
echo.
echo Then open: http://localhost:5173
echo.
pause
