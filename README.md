# 🎫 TicketsSystem

A web-based ticket management application for logging, tracking, and managing support or service requests.

✅ User authentication &nbsp;|&nbsp; ✅ Role-based access control &nbsp;|&nbsp; ✅ Ticket lifecycle management &nbsp;|&nbsp; ✅ Secure REST API

---

## 🏗 Repository Structure

| Component | Tech | Directory | Notes |
|-----------|------|-----------|-------|
| **Frontend** | Vite + React | `tickets-system/` | Currently uses mock data via `localStorage` |
| **Backend** | Node.js + Express | `backend/` | JWT auth, role-based middleware, PostgreSQL |
| **Database** | PostgreSQL | `backend/db/db.js` | Hosted on Render (production) |

### Backend API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/tickets` *(protected)*
- `POST /api/tickets` *(protected)*
- `PUT /api/tickets/:id` *(protected)*
- `DELETE /api/tickets/:id` *(protected)*

---

## 🌍 Live Deployment

**Frontend:** [https://ticketssystemfrontend.onrender.com](https://ticketssystemfrontend.onrender.com)

---

## ⚙️ Prerequisites

- Node.js (v18+ recommended)
- npm
- PostgreSQL (local or hosted, e.g. Render)
- Git
- *(Optional)* Postman or curl
- *(Optional)* Render account for deployment

---

## 📥 Clone the Repository

```bash
git clone https://github.com/Debug-Dames/TicketsSystem.git
cd TicketsSystem
```

---

## 🔐 Environment Variables

Create a `.env` file inside the `backend/` directory:

```env
DATABASE_URL=postgresql://<db_user>:<password>@<host>:<port>/<db_name>
JWT_SECRET=your_jwt_secret_here
PORT=5000
NODE_ENV=development
```

> ⚠️ **Never commit `.env` files to version control.** In production, configure environment variables in the Render dashboard.

---

## 🗄 Database Schema (PostgreSQL)

```sql
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role VARCHAR(20) NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  priority TEXT DEFAULT 'low',
  status TEXT DEFAULT 'open',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);
```

You can apply this schema by:
- Running it manually via `psql`
- Using the Render database console
- Placing it inside a `migrations/` directory

---

## 🚀 Running Locally

### 🔧 Backend

```bash
cd backend
npm install
npm run dev
# or: npm start
```

Backend runs on: `http://localhost:5000`

### 🎨 Frontend

```bash
cd tickets-system
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

> ⚠️ The frontend currently uses mock data via `localStorage`. Full API integration requires implementing a service-layer connecting to the backend.

---

## 🧪 API Testing (curl)

> Assumes backend is running on `http://localhost:5000`

**Register**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@example.com","password":"secret123","role":"user"}'
```

**Login**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@example.com","password":"secret123"}'
```

**Create Ticket** *(requires JWT)*
```bash
curl -X POST http://localhost:5000/api/tickets \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT_TOKEN>" \
  -d '{"title":"Printer broken","description":"Printer jammed","priority":"high"}'
```

**Get Tickets** *(requires JWT)*
```bash
curl -X GET http://localhost:5000/api/tickets \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

> All protected routes require: `Authorization: Bearer <token>`

---

## ☁️ Deployment on Render

- **Backend:** Deployed as a Render Web Service, connected to GitHub with auto-deploy enabled
- **Database:** PostgreSQL hosted via Render Managed Database, connected via `DATABASE_URL`
- **Flow:** Push to GitHub → Render detects changes → Auto-rebuild → Backend connects to production DB

---

## 🔁 Data Flow

```
Frontend → Backend API → Database → Backend → Frontend
```

**Ticket Creation Workflow:**
1. User logs in → receives JWT
2. User submits ticket
3. Backend validates token
4. Ticket stored in database
5. Status updated until resolution

---

## 👥 Use Cases

- End users submitting and tracking support tickets
- Agents reviewing and resolving tickets
- Administrators managing users
- Internal helpdesk operations

---

## ⚠️ Known Issues & Recommendations

**Database Layer Consistency**
PostgreSQL queries use `pg`. Ensure all queries use parameterized statements (`$1`, `$2`, etc.) to prevent SQL injection.

**Frontend Mock Mode**
The frontend relies on `localStorage`. A proper API service layer is needed to fully integrate with backend endpoints.

---

## 🚀 Future Enhancements

- Full frontend–backend API integration
- Ticket comments & attachments
- Email notifications
- Reporting & analytics dashboard
- Automated database migrations
- Unit & integration testing

---

## 📄 License

This project is maintained by [Debug-Dames](https://github.com/Debug-Dames).
