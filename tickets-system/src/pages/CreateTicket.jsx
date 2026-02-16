import React from "react";
import Navbar from "../components/Navbar.jsx";
import TicketForm from "../components/TicketForm.jsx";

const CreateTicket = () => {
  const handleTicketSubmit = (ticket) => {
    console.log("New Ticket Submitted:", ticket);
    alert("Ticket created successfully!");
  };

  return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar userType="user" />
      <div className="p-6 max-w-lg mx-auto">
        <TicketForm onSubmit={handleTicketSubmit} />
      </div>
    </div>
  );
};

export default CreateTicket;

