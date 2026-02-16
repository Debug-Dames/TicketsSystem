import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import CreateTicket from "./pages/CreateTicket.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AgentDashboard from "./pages/AgentDashboard.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-ticket" element={<CreateTicket />} />
      <Route path="/user" element={<UserDashboard />} />
      <Route path="/agent" element={<AgentDashboard />} />
      <Route path="/" element={<Navigate to="/agent" replace />} />
      <Route path="*" element={<Navigate to="/agent" replace />} />
    </Routes>
  );
}

export default App;


