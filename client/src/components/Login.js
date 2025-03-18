import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // ✅ Navigation Hook

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/auth/login", { email, password });
      const { token, user } = response.data;

      // ✅ Save user & token
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      onLoginSuccess(token, user);

      // ✅ Redirect to Home Page
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="p-6 bg-white shadow-md rounded max-w-sm mx-auto">
      <h2 className="text-xl font-bold mb-4 text-center">Login</h2>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleLogin} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          required
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Login
        </button>
      </form>

      {/* ✅ Register Button - Redirects to Register Page */}
      <div className="text-center mt-4">
        <p className="text-sm text-gray-600">Don't have an account?</p>
        <button
          onClick={() => navigate("/register")}
          className="mt-2 p-2 bg-green-500 text-white rounded"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Login;
