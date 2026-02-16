import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const NavBar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo">IT Support</div>
      {user && (
        <div className="links">
          <Link to="/dashboard">Dashboard</Link>
          {user.role === "user" && <Link to="/create-ticket">Create Ticket</Link>}
          {user.role === "agent" && <Link to="/all-tickets">All Tickets</Link>}
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

