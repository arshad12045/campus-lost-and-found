# Campus Lost & Found

Monorepo with a static prototype, React frontend, and Node.js + Express + MongoDB backend.

## Structure
- prototype/ static HTML/CSS/JS demo
- frontend/ React app (Vite)
- backend/ Express API with MongoDB

## Prerequisites
- Node 18+
- MongoDB running locally or Atlas connection string

## Setup

### Backend
```
cd backend
npm install
cp .env.example .env
# edit .env MONGO_URI and PORT as needed
npm run dev
```
API base: http://localhost:4000/api

### Frontend (React)
```
cd frontend
npm install
npm run dev
```
App: http://localhost:5173

### Prototype (Static)
Open prototype/index.html in a browser or use a simple static server.

## API Summary
- POST /api/items?type=lost|found
- GET /api/items?type=lost|found&search=keyword&category=Category
- PATCH /api/items/:id/resolve?type=lost|found
- POST /api/items/:id/contact

## Notes
The contact endpoint is a placeholder; integrate an email/SMS service to send messages.
