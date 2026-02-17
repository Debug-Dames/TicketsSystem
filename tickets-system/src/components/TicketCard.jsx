import React from "react";

const TicketCard = ({ ticket }) => {
  const statusColor = {
    Open: "bg-blue-900 text-blue-300 shadow-[0_0_10px_#3B82F6]",
    "In Progress": "bg-purple-900 text-purple-300 shadow-[0_0_10px_#7C3AED]",
    Resolved: "bg-pink-900 text-pink-300 shadow-[0_0_10px_#EC4899]",
  };

  return (
    <div
      className={`ticket-card p-4 mb-4 rounded-xl border border-gray-700 ${statusColor[ticket.status]} hover:scale-105 transition transform`}
    >
      <h2 className="text-xl font-bold mb-1">{ticket.title}</h2>
      <p className="text-gray-300 mb-1">{ticket.description}</p>
      <p className="mb-1">
        <span className="font-semibold">Category:</span> {ticket.category}
      </p>
      <p className="mb-1">
        <span className="font-semibold">Priority:</span> {ticket.priority}
      </p>
      <p className="inline-block px-2 py-1 rounded">{ticket.status}</p>
      {ticket.assignedTo && <p className="mt-1">Assigned to: {ticket.assignedTo}</p>}
    </div>
  );
};

export default TicketCard;
