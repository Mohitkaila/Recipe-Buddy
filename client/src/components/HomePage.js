import React from "react";
import { Container, Typography, Button } from "@mui/material";

const HomePage = ({ user, onLogout }) => {
  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Welcome, {user?.username || "Guest"}!</Typography>
      <Button variant="contained" color="secondary" onClick={onLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default HomePage;
