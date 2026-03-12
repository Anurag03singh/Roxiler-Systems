# Deployment Guide

## Quick Fix for "Showing HTML Only" Issue

If your deployed app shows only HTML without React loading:

1. **Add redirect rules** - Already added:
   - `frontend/public/_redirects` for Netlify
   - `vercel.json` for Vercel

2. **Rebuild and redeploy**:
   ```bash
   cd frontend
   npm run build
   ```

3. **Check your deployment platform settings**:
   - Root directory: `frontend`
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Update environment variables**:
   - Frontend: Set `VITE_API_URL` to your backend URL
   - Backend: Set `FRONTEND_URL` to your frontend URL

## Frontend Deployment

### Vercel
1. Import your repo
2. Framework: Vite
3. Root directory: `frontend`
4. Build command: `npm run build`
5. Output directory: `dist`
6. Add env variable: `VITE_API_URL=https://your-backend.com/api`

### Netlify
1. Import your repo
2. Base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `frontend/dist`
5. Add env variable: `VITE_API_URL=https://your-backend.com/api`

## Backend Deployment

### Railway/Render
1. Root directory: `backend`
2. Build command: `npm install && npx prisma generate && npm run build`
3. Start command: `npm run start:prod`
4. Environment variables:
   ```
   DATABASE_URL=your_postgres_url
   JWT_SECRET=your_secret_key
   JWT_EXPIRES_IN=7d
   FRONTEND_URL=https://your-frontend.com
   PORT=3000
   ```

## Common Issues

### React not loading
- Make sure `_redirects` file exists in `frontend/public/`
- Verify build output is in `dist/` folder
- Check browser console for errors

### API calls failing
- Update `VITE_API_URL` in frontend env
- Add `FRONTEND_URL` to backend env for CORS
- Check network tab for CORS errors

### 404 on page refresh
- Redirect rules not configured properly
- Redeploy after adding `_redirects` or `vercel.json`
