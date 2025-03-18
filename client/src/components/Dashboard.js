import React, { useState, useEffect } from "react";

const Dashboard = ({ user }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  useEffect(() => {
    if (!user) return; 

    const fetchSavedRecipes = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/recipes/saved", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        const data = await response.json();
        if (response.ok) {
          setSavedRecipes(data);
        } else {
          console.error("Error fetching saved recipes:", data.error);
        }
      } catch (error) {
        console.error("Server error:", error);
      }
    };

    fetchSavedRecipes();
  }, [user]);

  if (!user) {
    return <h2>Please log in to see saved recipes.</h2>;
  }

  return (
    <div>
      <h2>Saved Recipes</h2>
      {savedRecipes.length === 0 ? (
        <p>No saved recipes yet.</p>
      ) : (
        <ul>
          {savedRecipes.map((recipe, index) => (
            <li key={index}>{recipe.recipeText}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
