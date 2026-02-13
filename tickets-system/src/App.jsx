import { Routes, Route, Link } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Register from "./pages/Register.jsx"
import CreateTicket from "./pages/CreateTicket.jsx"
import UserDashboard from "./pages/UserDashboard.jsx"
import AgentDashboard from "./pages/AgentDashboard.jsx"
import "./App.css"

function App() {
  return (
    <>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/register">Register</Link> |{" "}
        <Link to="/create-ticket">Create Ticket</Link> |{" "}
        <Link to="/user">User Dashboard</Link> |{" "}
        <Link to="/agent">Agent Dashboard</Link>
      </nav>

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/agent" element={<AgentDashboard />} />
      </Routes>
    </>
  )
}

export default App

