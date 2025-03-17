import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import background from "../assets/login_background.jpg";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate(); // 🔹 Used for navigation

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    
    try {
      const res = await axios.post("http://localhost:3001/api/auth/register", {
        username,
        email,
        password,
      });

      if (res.status === 201) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000); // 🔹 Redirect to login after 2s
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
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
        top:'38%',
        left: '32%',
        zIndex: 1,
      }}>
        <Box my={4}>
          <Typography variant="h4" gutterBottom>Register</Typography>

          {/* 🔹 Display success or error messages */}
          {error && <Typography color="error">{error}</Typography>}
          {success && <Typography color="primary">Registration successful! Redirecting to login...</Typography>}

          <form onSubmit={handleRegister}>
            <TextField
              label="Username"
              fullWidth
              margin="normal"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
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
          
            {/* 🔹 Buttons: Register & Go to Login */}
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button variant="contained" color="success" sx={{fontSize: "1.0rem", padding: "8px 24px",}} type="submit">
                Register
              </Button>
              <Button variant="outlined" color="success" sx={{fontSize: "1.0rem", padding: "8px 24px",}} onClick={() => navigate("/login")}>
                Go to Login
              </Button>
            </Box>
          </form>
        </Box>
      </Container>
    </div>
  );
};

export default Register;
