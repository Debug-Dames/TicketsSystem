# Tickets System — Backend

Express + PostgreSQL REST API for the Tickets System. Handles authentication, ticket management, file uploads, and comments.

---

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL database (local or hosted)

---

## Environment Setup

Create a `.env` file in the `backend/` directory:

```env
PORT=5000
DATABASE_URL=postgres://user:pass@host:5432/dbname
JWT_SECRET=your_jwt_secret_here
```

> ⚠️ Keep `JWT_SECRET` private — it signs all login tokens. Never commit `.env` to version control.

---

## Install & Run

```bash
cd backend
npm install
```

**Development** (auto-restarts via nodemon):
```bash
npm run dev
```

**Production:**
```bash
npm start
```

Server runs on the configured `PORT` (default: `5000`). Static uploads are served from `/uploads`.

---

## Database

On startup, the server runs `db/initDatabase.js` which auto-creates any missing tables.

For manual setup, ensure these tables exist: `users`, `tickets`, `ticket_attachments`, `ticket_comments`.

---

## API Reference

All protected routes require the header:
```
Authorization: Bearer <token>
```

### Auth

| Method | Endpoint | Body | Description |
|--------|----------|------|-------------|
| `POST` | `/api/auth/register` | `{ name, email, password, role }` | Create a new user |
| `POST` | `/api/auth/login` | `{ email, password }` | Returns `{ success, token, user }` |

### Tickets

| Method | Endpoint | Role | Description |
|--------|----------|------|-------------|
| `POST` | `/api/tickets` | Any (authenticated) | Create a ticket. Accepts `multipart/form-data`; use field `attachments` for files |
| `GET` | `/api/tickets/my` | Any (authenticated) | Get tickets for the logged-in user. Returns `{ success: true, tickets: [...] }` |
| `GET` | `/api/tickets` | Support | List all tickets |
| `PUT` | `/api/tickets/:id/status` | Support | Update ticket status. Body: `{ status }` |
| `PUT` | `/api/tickets/:id/assign` | Support | Assign ticket to a support user. Body: `{ assigned_to }` |
| `POST` | `/api/tickets/:ticketId/comment` | Support | Add a comment. Body: `{ comment }` |

---

## Uploads

Files are saved to the `uploads/` directory and served statically at `/uploads`.

---

## Troubleshooting

- **Server won't start:** Verify `DATABASE_URL` and `JWT_SECRET` are set in `.env`
- **Database errors:** Check that your PostgreSQL instance is running and accepting connections from the server host
- **401 Unauthorized:** Ensure the `Authorization: Bearer <token>` header is included and the token hasn't expired

---

## Quick Reference

Start both backend and frontend in separate terminals:

```bash
# Terminal 1 — Backend
cd backend && npm run dev

# Terminal 2 — Frontend
cd tickets-system && npm run dev
```
