import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import RecipeDisplay from "./components/RecipeDisplay";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Dashboard from "./components/Dashboard"; // ✅ Added Dashboard
import Navbar from "./components/Navbar"; // ✅ Added Navbar
import "./App.css";

function App() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState('');
  const [error, setError] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [showRegister, setShowRegister] = useState(false);
  const eventSourceRef = useRef(null);
  const recipeDisplayRef = useRef(null);

  useEffect(() => () => closeEventStream(), []);

  useEffect(() => {
    if (recipeData) { 
      closeEventStream();
      initializeEventStream();
      recipeDisplayRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [recipeData]);

  const initializeEventStream = () => {
    const queryParams = new URLSearchParams(recipeData).toString();
    const url = `https://recipegenerator-n26b.onrender.com/recipeStream?${queryParams}`;
    eventSourceRef.current = new EventSource(url);

    eventSourceRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === 'close') {
        closeEventStream();
      } else if (data.chunk) {
        setRecipeText((prev) => prev + data.chunk);
      }
    };

    eventSourceRef.current.onerror = (error) => {
      console.error('Error:', error);
      setError('Connection issue.');
      closeEventStream();
    };
  };

  const closeEventStream = () => {
    if (eventSourceRef.current) eventSourceRef.current.close();
  };

  const handleRecipeSubmit = (data) => {
    setRecipeData(data);
    setRecipeText('');
    setError(null);
  };

  const handleRegister = (userData) => {
    setUser(userData);
    setShowRegister(false);
  };

  // ✅ Handle Save Recipe - Saves recipe to database if user is logged in
  const handleSaveRecipe = async () => {
    if (!user) {
      alert("You must be logged in to save recipes!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3001/api/recipes/save", 
        { recipeText }, 
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );

      if (response.status === 201) {
        alert("✅ Recipe saved successfully!");
      } else {
        alert("❌ Failed to save recipe.");
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("❌ Could not save recipe.");
    }
  };

  // ✅ Handle Login Success - Updates user state and saves token
  const handleLoginSuccess = (receivedToken, userInfo) => {
    setUser(userInfo);
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  // ✅ Handle Logout - Clears user state and storage
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} /> {/* ✅ Navbar added */}

      <div className="bg-gray-100">
        <Header onRegisterClick={() => setShowRegister(true)} />

        <Routes>
          {/* ✅ Home Page (Accessible by both guests and users) */}
          <Route path="/" element={
            <>
              <HomePage user={user} onLogout={handleLogout} />
              <Hero onRecipeSubmit={handleRecipeSubmit} />
              <div ref={recipeDisplayRef}>
                <RecipeDisplay error={error} recipeText={recipeText} />
                {recipeText && (
                  <button onClick={handleSaveRecipe} className="mt-4 p-2 bg-green-500 text-white rounded">
                    Save Recipe
                  </button>
                )}
              </div>
            </>
          } />

          {/* ✅ Dashboard for Registered Users Only */}
          {user ? (
            <Route path="/dashboard" element={<Dashboard user={user} />} />
          ) : (
            <Route path="/dashboard" element={<Navigate to="/login" />} />
          )}

          {/* ✅ Login & Register Routes */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />

          {/* ✅ Default Redirects */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
