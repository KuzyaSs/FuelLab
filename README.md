# Fuel Lab

Sport nutrition store — a web-programming course project.

## Stack
- Client: Vite, TypeScript, React, Redux Toolkit, React Router, MUI, axios
- Server: Express, JWT, bcrypt, JSON-file storage

## Run
```bash
cd server
npm install
npm run dev      # http://localhost:4000

cd client
npm install
npm run dev      # http://localhost:5173
```

The client proxies `/api` to the server. The database is created and seeded on first server start (`server/data/db.json`).

## Demo account
- Email: `demo@fuel.ru`
- Password: `demo123`

## Features
- Register / login (JWT)
- Catalog with search, category filter, price sort
- Product page
- Cart (persists in localStorage)
- Checkout with delivery/payment selection
- Order history and order details

## Scripts
- `client`: `npm run dev`, `npm run build`, `npm run lint`
- `server`: `npm run dev`, `npm start`
