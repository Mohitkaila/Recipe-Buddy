import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import RecipeDisplay from "./components/RecipeDisplay";
import Hero from "./components/Hero";
import Register from "./components/Register";
import Login from "./components/Login";
import IntroPage from "./components/IntroPage"; 
import TransitionPage from "./components/TransitionPage"; 
import HomePage from "./components/HomePage";  
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./components/ThemeProvider"; 
import "./App.css";

function AppContent() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const eventSourceRef = useRef(null);
  const recipeDisplayRef = useRef(null);

  const location = useLocation();
  const isIntroOrTransition = location.pathname === "/" || location.pathname === "/transition"; 

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
      if (data.action === "close") {
        closeEventStream();
      } else if (data.chunk) {
        setRecipeText((prev) => prev + data.chunk);
      }
    };

    eventSourceRef.current.onerror = (error) => {
      console.error("Error:", error);
      setError("Connection issue.");
      closeEventStream();
    };
  };

  const closeEventStream = () => {
    if (eventSourceRef.current) eventSourceRef.current.close();
  };

  const handleRecipeSubmit = (data) => {
    setRecipeData(data);
    setRecipeText("");
    setError(null);
  };

  const handleRegister = (userData) => {
    setUser(userData);
  };

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

  const handleLoginSuccess = (receivedToken, userInfo) => {
    setUser(userInfo);
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <ThemeProvider>
      {/* ✅ Hide Navbar on Intro & Transition Pages */}
      {!isIntroOrTransition && <Navbar user={user} onLogout={handleLogout} />}

      <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/transition" element={<TransitionPage />} />

          {/* ✅ Home Page - No Navbar, No Header */}
          <Route path="/home" element={
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

          {/* ✅ Login & Register */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />

          {/* ✅ Default Redirects */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

// ✅ Wrap inside Router to prevent errors
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
