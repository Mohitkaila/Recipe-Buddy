import React from "react";
import { useNavigate } from "react-router-dom";

const RecipeDisplay = ({ recipeText, user }) => {
  const navigate = useNavigate();

  const handleSaveRecipe = async () => {
    if (!user) {
      alert("You must be logged in to save recipes!");
      navigate("/login"); // Redirect to login
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
    <div className="p-4 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold mb-2">Generated Recipe:</h2>
      <p className="whitespace-pre-line">{recipeText}</p>

      {/* ✅ Show "Save Recipe" Button Only for Logged-in Users */}
      {user ? (
        <button
          onClick={handleSaveRecipe}
          className="mt-4 p-2 bg-green-500 text-white rounded"
        >
          Save Recipe
        </button>
      ) : (
        <p className="text-red-500 mt-4">Login to Save</p>
      )}
    </div>
  );
};

export default RecipeDisplay;
