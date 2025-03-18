import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeDisplay = ({ recipeText, user }) => {
  const navigate = useNavigate();

  const handleSaveRecipe = async () => {
    if (!user) {
      alert("You must be logged in to save recipes!");
      navigate("/login"); 
      return;
    }

    try {
      const response = await fetch("http://localhost:3001/api/recipes/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ recipeText }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("✅ Recipe saved successfully!");
      } else {
        alert(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error saving recipe:", error);
      alert("❌ Could not save recipe. Try again later.");
    }
  };

  return (
    <div>
      <h2>Generated Recipe:</h2>
      <p>{recipeText}</p>

      {user ? (
        <button onClick={handleSaveRecipe}>Save Recipe</button>
      ) : (
        <button onClick={() => navigate("/login")}>Login to Save</button>
      )}
    </div>
  );
};

export default RecipeDisplay;
