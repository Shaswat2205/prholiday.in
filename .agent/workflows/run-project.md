---
description: how to run the PRHolidays project (client and server)
---

To run the PRHolidays project locally, follow these steps:

### 1. Backend (Server)
// turbo
1. Navigate to the server directory:
   ```powershell
   cd server
   ```
2. Install dependencies (if not already done):
   ```powershell
   npm install
   ```
3. Start the server in development mode (using nodemon):
   ```powershell
   npm run dev
   ```
   *The server will run on [http://localhost:5000](http://localhost:5000)*

### 2. Frontend (Client)
// turbo
1. Navigate to the client directory in a new terminal:
   ```powershell
   cd client
   ```
2. Install dependencies (if not already done):
   ```powershell
   npm install
   ```
3. Start the React development server (using Vite):
   ```powershell
   npm run dev
   ```
   *The application will be available at [http://localhost:5173](http://localhost:5173)*

### 3. Environment Setup
Ensure you have a MongoDB instance running at `mongodb://localhost:27017/prholidays` (or update `server/.env` with your connection string).
