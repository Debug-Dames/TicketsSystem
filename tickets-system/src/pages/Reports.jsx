<<<<<<< HEAD:tickets-system/src/pages/Reports.jsx
import { useContext, useMemo, useState } from 'react'
import { AuthContext } from '../context/AuthContext.jsx'
import '../styles/dashboard.css'
=======
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "../styles/dashboard.css";
>>>>>>> origin/nomzamo:tickets-system/src/pages/UserDashboard.jsx

const initialTickets = [
  {
    id: "TCK-001",
    title: "Login issue",
    description: "Cannot login to my account",
    category: "Authentication",
    priority: "High",
    status: "Open",
    createdAt: "2026-02-10",
  },
  {
    id: "TCK-002",
    title: "Profile update bug",
    description: "Cannot update profile picture",
    category: "Frontend",
    priority: "Medium",
    status: "In Progress",
    createdAt: "2026-02-12",
  },
  {
    id: "TCK-003",
    title: "Payment confirmation delay",
    description: "Receipt email arrives very late",
    category: "Billing",
    priority: "Low",
    status: "Resolved",
    createdAt: "2026-02-14",
  },
];

<<<<<<< HEAD:tickets-system/src/pages/Reports.jsx
function Reports() {
  const { user } = useContext(AuthContext)
  const [allTickets] = useState(() => JSON.parse(localStorage.getItem(TICKETS_KEY)) || [])

  const visibleTickets = useMemo(() => {
    if (!user) return []
    if (user.role === 'agent') return allTickets
    return allTickets.filter((ticket) => ticket.createdBy === user.email)
  }, [allTickets, user])

  const openCount = useMemo(() => visibleTickets.filter((ticket) => ticket.status === 'Open').length, [visibleTickets])
  const inProgressCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.status === 'In Progress').length,
    [visibleTickets],
  )
  const resolvedCount = useMemo(
    () => visibleTickets.filter((ticket) => ticket.status === 'Resolved').length,
    [visibleTickets],
  )

  return (
    <main className='dashboard-page'>
      <section className='dashboard-card'>
        <div className='dashboard-hero'>
          <div>
            <p className='dashboard-kicker'>Insights</p>
            <h1>Reports</h1>
            <p className='dashboard-subtitle'>
              {user?.role === 'agent' ? 'Operational overview of all tickets.' : 'Summary of your ticket activity.'}
            </p>
=======
const statusStyles = {
  Open: "badge badge-open",
  "In Progress": "badge badge-progress",
  Resolved: "badge badge-resolved",
};

const UserDashboard = () => {
  const [tickets, setTickets] = useState(initialTickets);
  const userName = "Thando";

  const stats = useMemo(() => {
    const total = tickets.length;
    const open = tickets.filter((ticket) => ticket.status === "Open").length;
    const inProgress = tickets.filter((ticket) => ticket.status === "In Progress").length;
    const resolved = tickets.filter((ticket) => ticket.status === "Resolved").length;
    return { total, open, inProgress, resolved };
  }, [tickets]);

  const deleteTicket = (ticketId) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== ticketId));
  };

  const getAutoUpdateMessage = (status) => {
    if (status === "Resolved") {
      return "Auto-updated: ticket resolved";
    }
    if (status === "In Progress") {
      return "Auto-updating from support team";
    }
    return "Waiting for support update";
  };

  return (
    <div className="user-dashboard-page">
      <Navbar userType="user" />
      <main className="user-dashboard-container">
        <section className="panel hero-panel">
          <h1 className="hero-title">
            Welcome back, {userName}
          </h1>
          <p className="hero-copy">
            Here is a quick view of your support activity.
          </p>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <p className="stat-label">Total Tickets</p>
            <p className="stat-value">{stats.total}</p>
>>>>>>> origin/nomzamo:tickets-system/src/pages/UserDashboard.jsx
          </div>
          <div className="stat-card">
            <p className="stat-label">Open</p>
            <p className="stat-value">{stats.open}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">In Progress</p>
            <p className="stat-value">{stats.inProgress}</p>
          </div>
          <div className="stat-card">
            <p className="stat-label">Resolved</p>
            <p className="stat-value">{stats.resolved}</p>
          </div>
        </section>

<<<<<<< HEAD:tickets-system/src/pages/Reports.jsx
        <div className='dashboard-stats'>
          <article>
            <h3>Total Tickets</h3>
            <p>{visibleTickets.length}</p>
          </article>
          <article>
            <h3>Open</h3>
            <p>{openCount}</p>
          </article>
          <article>
            <h3>In Progress</h3>
            <p>{inProgressCount}</p>
          </article>
          <article>
            <h3>Resolved</h3>
            <p>{resolvedCount}</p>
          </article>
        </div>
      </section>
    </main>
  )
}

export default Reports
=======
        <section className="actions-row">
          <Link
            to="/create-ticket"
            className="primary-action-btn"
          >
            Create Ticket
          </Link>
        </section>

        <section className="panel">
          <h2 className="section-title">Ticket Cards</h2>
          {tickets.map((ticket) => (
            <div key={ticket.id} className="ticket-item">
              <div className="ticket-item-header">
                <p className="ticket-id">{ticket.id}</p>
                <span className={statusStyles[ticket.status]}>{ticket.status}</span>
              </div>
              <h3 className="ticket-title">{ticket.title}</h3>
              <p className="ticket-description">{ticket.description}</p>
              <div className="ticket-meta-row">
                <span><strong>Category:</strong> {ticket.category}</span>
                <span><strong>Priority:</strong> {ticket.priority}</span>
                <span><strong>Created:</strong> {ticket.createdAt}</span>
              </div>
            </div>
          ))}
        </section>

        <section className="panel">
          <h2 className="section-title">Ticket Table</h2>
          <div className="table-wrap">
            <table className="ticket-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Created</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tickets.length === 0 ? (
                  <tr>
                    <td colSpan="7">No tickets available.</td>
                  </tr>
                ) : (
                  tickets.map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{ticket.id}</td>
                      <td>{ticket.title}</td>
                      <td>{ticket.category}</td>
                      <td>{ticket.priority}</td>
                      <td>{ticket.createdAt}</td>
                      <td><span className={statusStyles[ticket.status]}>{ticket.status}</span></td>
                      <td>
                        <div className="table-actions">
                          <button
                            type="button"
                            className="table-delete-btn"
                            onClick={() => deleteTicket(ticket.id)}
                          >
                            Delete
                          </button>
                          <p className="table-update-note">{getAutoUpdateMessage(ticket.status)}</p>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
>>>>>>> origin/nomzamo:tickets-system/src/pages/UserDashboard.jsx
