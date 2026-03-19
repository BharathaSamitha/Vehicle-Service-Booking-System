# Vehicle Service App

This project is a full-stack application for managing vehicle service bookings, categories, and user authentication. It consists of a backend (Node.js/Express) and a frontend (React/Vite/Tailwind).

## Project Structure

```
vehicle-service-app/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── config/
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── api/
│   ├── index.html
│   ├── package.json
│   └── tailwind.config.cjs
```

## Backend
- Node.js, Express
- MongoDB (via Mongoose)
- Handles authentication, bookings, categories, dashboard stats

### Setup
1. Navigate to `backend` folder:
   ```powershell
   cd backend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Configure MongoDB connection in `src/config/db.js`.
4. Start the server:
   ```powershell
   npm start
   ```

## Frontend
- React, Vite, Tailwind CSS
- User and admin interfaces for booking, category management, dashboard

### Setup
1. Navigate to `frontend` folder:
   ```powershell
   cd frontend
   ```
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Start the development server:
   ```powershell
   npm run dev
   ```

## Environment Variables

Backend:
- Create a `.env` file in `backend` with:
  - `MONGO_URI` (MongoDB connection string)
  - `JWT_SECRET` (JWT secret key)
  - `PORT` (optional, default 5000)

Frontend:
- Create a `.env` file in `frontend` if you need custom API URLs, e.g.:
  - `VITE_API_URL=http://localhost:5000`

## API Endpoints

- `/api/auth` – User authentication (register, login)
- `/api/bookings` – Booking CRUD operations
- `/api/categories` – Service category CRUD
- `/api/dashboard` – Dashboard statistics

## Testing

Backend:
- Add tests in `backend/tests/` (Jest or Mocha recommended)
- Run tests: `npm test`

Frontend:
- Add tests in `frontend/src/__tests__/` (Jest/React Testing Library recommended)
- Run tests: `npm test`

## Deployment

- Backend: Deploy to platforms like Heroku, Render, or Azure. Ensure environment variables are set.
- Frontend: Deploy to Vercel, Netlify, or Azure Static Web Apps. Update API URLs as needed.

## Features
- User authentication and registration
- Booking management
- Service category management
- Dashboard with statistics

## Contact & Support

For issues or feature requests, open an issue or contact the maintainer.

## License
MIT
