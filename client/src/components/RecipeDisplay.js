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
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
        Generated Recipe
      </h2>
      <p className="whitespace-pre-line text-lg text-gray-700 dark:text-gray-300 mb-4">{recipeText}</p>

      {/* Show "Save Recipe" Button Only for Logged-in Users */}
      {user ? (
        <div className="flex justify-center">
          <button
            onClick={handleSaveRecipe}
            className="mt-4 px-6 py-3 bg-green-500 text-white rounded-full text-lg transition-all hover:bg-green-600"
          >
            Save Recipe
          </button>
        </div>
      ) : (
        <p className="text-center text-red-500 mt-4">Please log in to save your recipe.</p>
      )}
    </div>
  );
};

export default RecipeDisplay;
