# 🚀 Running the Modak-Cafe Project

## Current Status

✅ Environment files created (.env)
🔄 Installing dependencies (in progress)
⚠️ Docker Desktop needs to be started

## Step-by-Step Instructions

### Step 1: Start Docker Desktop

**IMPORTANT:** You need to start Docker Desktop first!

1. Open Docker Desktop application
2. Wait for it to fully start (whale icon in system tray should be steady)
3. Verify it's running: Open terminal and run `docker ps`

### Step 2: Start PostgreSQL Database

Once Docker Desktop is running:

```bash
docker-compose up -d
```

This will start PostgreSQL on port 5432.

### Step 3: Setup Backend Database

```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npx prisma db seed
```

### Step 4: Start Backend Server

```bash
cd backend
npm run start:dev
```

Backend will run on: http://localhost:3000/api

### Step 5: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

Frontend will run on: http://localhost:5173

## Quick Commands

### Check if Docker is running
```bash
docker ps
```

### View database in Prisma Studio
```bash
cd backend
npx prisma studio
```

### Restart everything
```bash
# Stop all
docker-compose down
# Start fresh
docker-compose up -d
cd backend && npx prisma migrate reset && npm run start:dev
```

## Test Credentials

Once everything is running, go to http://localhost:5173 and login:

- **Admin:** admin@modak-cafe.com / Admin@123
- **User:** user1@example.com / User@123
- **Store Owner:** owner@store1.com / Owner@123

## Troubleshooting

### Docker Desktop not starting?
- Make sure Docker Desktop is installed
- Try restarting your computer
- Check if virtualization is enabled in BIOS

### Port already in use?
```bash
npx kill-port 3000
npx kill-port 5173
npx kill-port 5432
```

### Database connection error?
- Make sure Docker Desktop is running
- Check: `docker ps` should show postgres container
- Restart: `docker-compose restart`

### Prisma errors?
```bash
cd backend
npx prisma generate
npx prisma migrate reset
npx prisma db seed
```

## What's Currently Happening

I've started:
1. ✅ Created .env files for backend and frontend
2. 🔄 Installing backend dependencies (npm install)
3. 🔄 Installing frontend dependencies (npm install)

## Next Steps After Dependencies Install

1. Start Docker Desktop manually
2. Run: `docker-compose up -d`
3. Run: `cd backend && npx prisma generate`
4. Run: `cd backend && npx prisma migrate dev`
5. Run: `cd backend && npx prisma db seed`
6. Run: `cd backend && npm run start:dev`
7. Run: `cd frontend && npm run dev` (in new terminal)
8. Open: http://localhost:5173

## Need Help?

- Read QUICKSTART.md for detailed instructions
- Read START_HERE.txt for overview
- Check IMPLEMENTATION_STATUS.md for features
