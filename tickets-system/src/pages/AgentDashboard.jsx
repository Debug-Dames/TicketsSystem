import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import TicketCard from "../components/TicketCard.jsx";

const initialTickets = [
  { title: "Login issue", description: "Cannot login", category: "Auth", priority: "High", status: "Open", assignedTo: null },
  { title: "UI bug", description: "Button not clickable", category: "Frontend", priority: "Medium", status: "In Progress", assignedTo: "Agent 2" },
];

const agents = ["Agent 1", "Agent 2", "Agent 3"];  

const AgentDashboard = () => {
  const [tickets, setTickets] = useState(initialTickets);

  const assignTicket = (idx, agent) => {
    const updated = [...tickets];
    updated[idx].assignedTo = agent;
    setTickets(updated); // Real-time simulated update
  };

return (
    <div className="min-h-screen bg-[#1a1a1a]">
      <Navbar userType="agent" />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primaryPurple mb-6">All Tickets</h1>
        {tickets.map((ticket, idx) => (
          <div key={idx} className="mb-4">
            <TicketCard ticket={ticket} />
            <div className="flex space-x-2 mt-2">
              <select
                value={ticket.assignedTo || ""}
                onChange={(e) => assignTicket(idx, e.target.value)}
                className="p-2 rounded bg-[#222] text-white"
              >
                <option value="">Assign to...</option>
                {agents.map((agent, i) => (
                  <option key={i} value={agent}>{agent}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
 
};

export default AgentDashboard;






