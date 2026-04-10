# AI-Powered Exam Notes Generator

A full-stack exam notes generator using React, Vite, Node.js/Express, MongoDB, JWT authentication, Stripe payments, and Google Gemini AI.

## Project Structure

- `client/` - React frontend built with Vite and Tailwind CSS.
- `server/` - Express backend with API routes, authentication, note generation, PDF download, and Stripe webhook handling.

## Features

- Google-based authentication
- Exam notes generation using AI prompt engineering
- Mermaid diagram rendering
- Recharts visualizations
- Credit-based model for generating notes
- PDF download for notes
- Stripe payment integration
- Notes history and detail viewer

## Production Readiness

- Environment-based configuration for client and server
- Cookie security settings configured for production
- Static asset serving from `client/dist` in production mode
- Dedicated API base URL config in frontend
- Root `.gitignore` for common ignored files

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- MongoDB URI
- Google Gemini API key
- Stripe account and webhook secret
- Firebase project credentials (optional for Google sign-in)

### Server Setup

1. Navigate to the server folder:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and populate values:
   ```bash
   cp .env.example .env
   ```
4. Start the backend in development:
   ```bash
   npm run dev
   ```

### Client Setup

1. Navigate to the client folder:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and populate values:
   ```bash
   cp .env.example .env
   ```
4. Start the frontend in development:
   ```bash
   npm run dev
   ```

### Build for Production

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```
2. Start the server in production mode:
   ```bash
   cd ../server
   NODE_ENV=production npm start
   ```

## Environment Variables

### Server

- `MONGODB_URL` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT token generation
- `GEMINI_API_KEY` - Google Gemini API key
- `STRIPE_SECRET_KEY` - Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Stripe webhook secret
- `CLIENT_URL` - Client application URL for CORS and Stripe redirects
- `PORT` - Server port
- `NODE_ENV` - `development` or `production`

### Client

- `VITE_SERVER_URL` - Backend API URL
- `VITE_FIREBASE_APIKEY` - Firebase API key
- `VITE_FIREBASE_AUTHDOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECTID` - Firebase project ID
- `VITE_FIREBASE_STORAGEBUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGINGSENDERID` - Firebase messaging sender ID
- `VITE_FIREBASE_APPID` - Firebase app ID

## Deployment Notes

- Build the frontend and serve static files from the backend in production.
- Ensure `NODE_ENV=production` for secure cookies and proper static asset serving.
- Use managed MongoDB or Atlas for production reliability.

## Recommended Improvements

- Add automated tests for backend routes and React components.
- Add CI/CD pipeline for deployment.
- Add input validation and rate limiting on server APIs.
- Add a `root` package or workspace for monorepo management if desired.
