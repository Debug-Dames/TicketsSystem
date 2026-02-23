# Tickets System — Frontend

React + Vite client for the Tickets System. Provides the UI for authentication, ticket creation, and dashboard views.

---

## Prerequisites

- Node.js 18+ and npm
- Backend server running (see [`../backend`](../backend/README.md))

---

## Install & Run

```bash
cd tickets-system
npm install
npm run dev
```

App runs at: `http://localhost:5173`

---

## Features

- **React 19 + Vite** with Hot Module Replacement
- **Routing** via `react-router-dom`
- **Auth flow** — login and register pages; session stored in `localStorage` under `ts_current_user`
- **Dashboard** — fetches the authenticated user's tickets from `GET /api/tickets/my`

---

## Configuration

The API base URL is defined in `src/services/api.js` (default: `http://localhost:5000/api`).

To avoid editing source files when switching environments, consider adding a Vite environment variable:

```env
# tickets-system/.env
VITE_API_URL=http://localhost:5000/api
```

Then reference it in `src/services/api.js`:

```js
const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api';
```

---

## Auth

On successful login, the backend returns a JWT token. The frontend stores it in `localStorage` as `ts_current_user` and attaches it to all subsequent requests via the `Authorization: Bearer <token>` header.

---

## Other Scripts

**Production build:**
```bash
npm run build
npm run preview
```

**Lint:**
```bash
npm run lint
```

---

## Troubleshooting

**Dashboard loads but shows no tickets:**
- Confirm you are logged in — check `localStorage` for a `ts_current_user` entry.
- Confirm the backend is running at `http://localhost:5000` (or update `src/services/api.js`).
- Confirm `GET /api/tickets/my` returns `{ success: true, tickets: [...] }`.

**Login/register fails with a network error:**
- Check that the backend is running and accessible.
- Check the browser console for CORS errors — the backend must allow requests from `http://localhost:5173`.

---

## Quick Reference

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd tickets-system && npm run dev
```