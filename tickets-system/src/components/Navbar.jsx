<<<<<<< HEAD
=======
import React from "react";
import { Link } from "react-router-dom";
import "../styles/dashboard.css";

const Navbar = ({ userType }) => {
  return (
    <nav className="app-navbar">
      <div className="app-navbar-inner">
        <h1 className="app-navbar-title">Debug Dames Ticketing System</h1>
        <div className="app-navbar-links">
          <Link to="/" className="app-nav-link">Home</Link>
        {userType === "user" && (
          <>
              <Link to="/create-ticket" className="app-nav-link">Create Ticket</Link>
              <Link to="/user" className="app-nav-link">My Tickets</Link>
          </>
        )}
        {userType === "agent" && (
            <Link to="/agent" className="app-nav-link">All Tickets</Link>
        )}
          <Link to="/login" className="app-nav-link">Logout</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
>>>>>>> parent of d8d1ecb (MergedPages)
