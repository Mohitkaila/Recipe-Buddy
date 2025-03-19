import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      {/* Left Side: Brand Name */}
      <Link to="/home" className="text-xl font-bold hover:text-gray-300 transition">
        Recipe Buddy
      </Link>

      {/* Right Side: Navigation Links */}
      <div className="flex gap-4">
        <Link to="/home" className="px-4 py-2 hover:text-gray-300 transition">
          Home
        </Link>
        {user && (
          <Link to="/dashboard" className="px-4 py-2 hover:text-gray-300 transition">
            Dashboard
          </Link>
        )}
        {user ? (
          <button
            onClick={() => {
              onLogout();
              navigate("/"); // ✅ Redirect to intro page on logout
            }}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg transition"
          >
            Logout
          </button>
        ) : (
          <Link to="/login" className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
