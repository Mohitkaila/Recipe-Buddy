import React, { useState, useRef, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import RecipeDisplay from "./components/RecipeDisplay";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Register from "./components/Register";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
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

  const handleSaveRecipe = () => {
    setSavedRecipes((prev) => [...prev, recipeText]);
  };

  // 🔹 Handle Login Success
  const handleLoginSuccess = (receivedToken, userInfo) => {
    setUser(userInfo);
    localStorage.setItem("token", receivedToken);
    localStorage.setItem("user", JSON.stringify(userInfo));
  };

  // 🔹 Handle Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="bg-gray-100">
        <Header onRegisterClick={() => setShowRegister(true)} />

        <Routes>
          {/* 🔹 Home page is visible first */}
            <>
            <Route path="/" element={
              <>
                <HomePage user={user} onLogout={handleLogout} />
                <Hero onRecipeSubmit={handleRecipeSubmit} />
                <div ref={recipeDisplayRef}>
                  <RecipeDisplay error={error} recipeText={recipeText} />
                  {recipeText && (
                    <button onClick={handleSaveRecipe} className="mt-4 p-2 bg-green-600 hover:bg-green-700 text-white rounded">
                      Save Recipe
                    </button>
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold mb-4">Saved Recipes</h2>
                  <ul>
                    {savedRecipes.map((recipe, index) => (
                      <li key={index} className="mb-2 p-2 border border-gray-300 rounded">
                        {recipe}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            } />
            <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess}/>}/>
            <Route path="/register" element={<Register onRegister={handleRegister} />} />
            <Route path="*" element={<Navigate to="/" />} />
          </>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
