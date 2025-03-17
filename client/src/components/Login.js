import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import background from "../assets/login_background.jpg";

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // 🔹 Used for navigation

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3001/api/auth/login", {
        email,
        password,
      });
      onLoginSuccess(res.data.token, res.data.user);
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    }
  };

  return (
    <div className="relative w-full">
      {/*Background image*/}
      <img 
        src={background}
        alt="background"
        className="w-full h-auto object-cover"
        style={{zIndex: -1}}
      />
      <Container maxWidth="sm" sx={{
        position:'absolute',
        top:'40%',
        left: '32%',
        zIndex: 1,
      }}>
        <Box my={4}>
          <Typography variant="h4" gutterBottom>Login</Typography>
          {error && <Typography color="error">{error}</Typography>}
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              margin="normal"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              fullWidth
              margin="normal"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="success" sx={{fontSize: "1.0rem", padding: "8px 24px",}} type="submit">
                Login
              </Button>
              {/* 🔹 Register Button to navigate to /register */}
              <Button variant="contained" color="success" sx={{fontSize: "1.0rem", padding: "8px 24px",}} onClick={() => navigate("/register")}>
                Register
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
