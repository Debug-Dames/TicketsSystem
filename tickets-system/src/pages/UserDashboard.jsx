import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import "../styles/dashboard.css";

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

  const updateStatus = (ticketId, nextStatus) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === ticketId ? { ...ticket, status: nextStatus } : ticket
      )
    );
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
                  <th>Change</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.title}</td>
                    <td>{ticket.category}</td>
                    <td>{ticket.priority}</td>
                    <td>{ticket.createdAt}</td>
                    <td><span className={statusStyles[ticket.status]}>{ticket.status}</span></td>
                    <td>
                      <select
                        value={ticket.status}
                        onChange={(e) => updateStatus(ticket.id, e.target.value)}
                        className="status-select"
                      >
                        <option value="Open">Open</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Resolved">Resolved</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UserDashboard;
