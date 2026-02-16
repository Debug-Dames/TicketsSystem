import React, { useState } from "react";

const TicketForm = ({ onSubmit }) => {
  const [ticket, setTicket] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Low",
    attachments: [],
  });

  const handleChange = (e) => {
    setTicket({ ...ticket, [e.target.name]: e.target.value });
  };

   const handleFileChange = (e) => {
    setTicket({ ...ticket, attachments: Array.from(e.target.files) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(ticket);
    setTicket({ title: "", description: "", category: "", priority: "Low", attachments: [] });
  };


  return (
    <form onSubmit={handleSubmit} 
          className="bg-[#111] p-6 rounded-lg shadow-lg">

      <h2 className="text-2xl font-bold mb-4 text-primaryPurple">Create Ticket</h2>
      <input
        type="text"
        name="title"
        value={ticket.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 mb-3 rounded bg-[#222] text-white"
        required
      />
      <textarea
        name="description"
        value={ticket.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 mb-3 rounded bg-[#222] text-white"
        required
      />
      <input
        type="text"
        name="category"
        value={ticket.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full border p-2 mb-3 rounded bg-[#222] text-white"
        required
      />
      <select
        name="priority"
        value={ticket.priority}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded bg-[#222] text-white"
      >
 
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className="w-full mb-3 text-white"
      />

      <button
        type="submit"
        className="bg-accentPink text-white px-4 py-2 rounded hover:bg-softRed"
      >
        Submit
      </button>
    </form>
  );
};

export default TicketForm;


