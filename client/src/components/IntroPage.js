import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/bg.jpg"; // ✅ Background image

export default function IntroPage() {
  const navigate = useNavigate();

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Welcome to Recipe Buddy</h1>
        <button
          onClick={() => navigate("/transition")}
          className="px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Start
        </button>
      </div>
    </div>
  );
}
