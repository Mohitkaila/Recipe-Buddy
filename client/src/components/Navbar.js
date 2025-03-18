import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav>
      <Link to="/">Home</Link>

      {user ? ( // ✅ Show these only when user is logged in
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={onLogout}>Logout</button>
        </>
      ) : (
        <Link to="/login">Login</Link> 
      )}
    </nav>
  );
};

export default Navbar;
