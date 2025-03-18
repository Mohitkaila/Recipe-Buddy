import React from "react";

const HomePage = ({ user, onLogout }) => {
  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold">
        Welcome, {user ? user.username : "Guest"}!
      </h1>

      {/* ✅ Only show Logout button if user is logged in */}
      {user && (
        <button
          onClick={onLogout}
          className="mt-4 px-4 py-2 bg-purple-600 text-white rounded"
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default HomePage;
