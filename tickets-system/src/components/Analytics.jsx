import React from "react";

const Analytics = ({ tickets }) => {
  const openCount = tickets.filter(t => t.status === "Open").length;
  const resolvedCount = tickets.filter(t => t.status === "Resolved").length;

  return (
    <div className="bg-[#111] p-6 rounded-lg shadow-lg mb-6 flex justify-around">
      <div className="text-center">
        <h3 className="text-lg font-bold text-accentPink">Open Tickets</h3>
        <p className="text-white text-2xl">{openCount}</p>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-bold text-primaryPurple">Resolved Tickets</h3>
        <p className="text-white text-2xl">{resolvedCount}</p>
      </div>
    </div>
  );
};

export default Analytics;
