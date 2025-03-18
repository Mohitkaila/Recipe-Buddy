import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeProvider";

const Navbar = ({ user, onLogout }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-900 dark:text-white">
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-lg font-semibold">Home</Link>

        {user ? (
          <>
            <Link to="/dashboard" className="text-lg">Dashboard</Link>
            <button onClick={onLogout} className="text-lg text-red-500">Logout</button>
          </>
        ) : (
          <Link to="/login" className="text-lg">Login</Link>
        )}
      </div>

      {/* ✅ Theme Toggle Button */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded bg-gray-200 dark:bg-gray-700 dark:text-white"
      >
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
