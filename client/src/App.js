import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
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
import "./App.css";

function AppContent() {
  const [recipeData, setRecipeData] = useState(null);
  const [recipeText, setRecipeText] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);
  const [loading, setLoading] = useState(false);
  const eventSourceRef = useRef(null);
  const recipeDisplayRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate(); // Moved `useNavigate()` inside the component

  const isIntroOrTransition = location.pathname === "/" || location.pathname === "/transition";

  useEffect(() => () => closeEventStream(), []);

  useEffect(() => {
    if (recipeData) {
      setLoading(true);
      setRecipeText(""); // Reset previous recipe
      closeEventStream();

      const queryParams = new URLSearchParams(recipeData).toString();
      const url = `https://recipegenerator-n26b.onrender.com/recipeStream?${queryParams}`;
      eventSourceRef.current = new EventSource(url);

      eventSourceRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.action === "close") {
          closeEventStream();
          setLoading(false);
        } else if (data.chunk) {
          setRecipeText((prev) => prev + data.chunk);
        }
      };

      eventSourceRef.current.onerror = (error) => {
        console.error("Error:", error);
        setError("Connection issue.");
        setLoading(false);
        closeEventStream();
      };
    }
  }, [recipeData]);

  const closeEventStream = () => {
    if (eventSourceRef.current) eventSourceRef.current.close();
  };

  const handleRecipeSubmit = (data) => {
    setRecipeData(data); // API request starts immediately
  };

  const handleGenerateAnother = () => {
    setRecipeData(null);
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
      const response = await axios.post(
        "http://localhost:3001/api/recipes/save",
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

    navigate("/home"); // Redirect to home page after login
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/"); // Redirect to intro page after logout
  };

  return (
    <>
      {!isIntroOrTransition && <Navbar user={user} onLogout={handleLogout} />}
      <div className="bg-gray-900 text-white min-h-screen"> {/* Dark mode applied everywhere */}
        <Routes>
          <Route path="/" element={<IntroPage />} />
          <Route path="/transition" element={<TransitionPage />} />
          <Route
            path="/home"
            element={
              <HomePage user={user} onLogout={handleLogout}>
                {!recipeData && <Hero onRecipeSubmit={handleRecipeSubmit} />}

                {loading && (
                  <div className="mt-4 p-4 text-white bg-gray-800 rounded-lg text-center">
                    ⏳ Please wait, generating your recipe...
                  </div>
                )}

                <div ref={recipeDisplayRef} className="mt-6">
                  {!loading && recipeText && <RecipeDisplay error={error} recipeText={recipeText} />}

                  {!loading && recipeText && (
                    <div className="flex justify-center gap-4 mt-4">
                      <button onClick={handleSaveRecipe} className="p-2 bg-green-500 text-white rounded">
                        Save Recipe
                      </button>
                      <button onClick={handleGenerateAnother} className="p-2 bg-blue-500 text-white rounded">
                        Generate Another Recipe
                      </button>
                    </div>
                  )}
                </div>
              </HomePage>
            }
          />
          {user ? <Route path="/dashboard" element={<Dashboard user={user} />} /> : <Route path="/dashboard" element={<Navigate to="/login" />} />}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
