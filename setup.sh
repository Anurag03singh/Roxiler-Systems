#!/bin/bash

echo "🚀 Setting up Modak-Cafe Store Rating System..."

# Start PostgreSQL
echo "📦 Starting PostgreSQL with Docker..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

# Setup Backend
echo "🔧 Setting up Backend..."
cd backend

# Copy env file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created backend .env file"
fi

# Install dependencies
echo "📥 Installing backend dependencies..."
npm install

# Generate Prisma Client
echo "🔨 Generating Prisma Client..."
npx prisma generate

# Run migrations
echo "🗄️  Running database migrations..."
npx prisma migrate dev --name init

# Seed database
echo "🌱 Seeding database..."
npx prisma db seed

echo "✅ Backend setup complete!"

# Setup Frontend
cd ../frontend
echo "🎨 Setting up Frontend..."

# Copy env file
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created frontend .env file"
fi

# Install dependencies
echo "📥 Installing frontend dependencies..."
npm install

echo "✅ Frontend setup complete!"

cd ..

echo ""
echo "🎉 Setup Complete!"
echo ""
echo "To start the application:"
echo "1. Backend:  cd backend && npm run start:dev"
echo "2. Frontend: cd frontend && npm run dev"
echo ""
echo "Default Admin Login:"
echo "Email: admin@modak-cafe.com"
echo "Password: Admin@123"
echo ""
echo "Backend: http://localhost:3000/api"
echo "Frontend: http://localhost:5173"
