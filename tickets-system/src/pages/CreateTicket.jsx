import React from "react";
import Navbar from "../components/Navbar.jsx";
import TicketForm from "../components/TicketForm.jsx";
import "../styles/dashboard.css";

const CreateTicket = () => {
  const handleTicketSubmit = (ticket) => {
    console.log("New Ticket Submitted:", ticket);
    alert("Ticket created successfully!");
  };

  return (
    <div className="create-ticket-page">
      <Navbar userType="user" />
      <main className="create-ticket-container">
        <section className="panel create-ticket-panel">
          <h1 className="section-title">Create Ticket</h1>
          <p className="hero-copy">Select a ticket title and description to submit faster.</p>
          <TicketForm onSubmit={handleTicketSubmit} />
        </section>
      </main>
    </div>
  );
};

export default CreateTicket;

