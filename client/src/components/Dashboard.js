import React, { useState, useEffect } from "react";

const Dashboard = ({ user }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user) {
      fetchSavedRecipes();
    }
  }, [user]);

  const fetchSavedRecipes = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3001/api/recipes/saved", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch saved recipes.");
      }

      const data = await response.json();
      setSavedRecipes(data);
    } catch (error) {
      console.error("Error fetching saved recipes:", error);
      setError("Failed to load saved recipes.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded">
      <h1 className="text-2xl font-bold">Welcome, {user?.username || "Guest"}!</h1>

      <h2 className="text-xl font-bold mb-2 mt-4">Saved Recipes</h2>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && savedRecipes.length === 0 && <p>No saved recipes yet.</p>}

      {!loading && savedRecipes.length > 0 && (
        <ul className="space-y-2">
          {savedRecipes.map((recipe, index) => (
            <li key={index}>
              <button
                onClick={() => setSelectedRecipe(recipe)}
                className="text-blue-600 hover:underline"
              >
                {recipe.title ? recipe.title : "Untitled Recipe"}
              </button>
            </li>
          ))}
        </ul>
      )}

      {selectedRecipe && (
        <div className="mt-4 p-4 border border-gray-300 rounded">
          <h3 className="text-lg font-bold">{selectedRecipe.title}</h3>
          <p className="whitespace-pre-line">{selectedRecipe.recipeText}</p>
          <button
            onClick={() => setSelectedRecipe(null)}
            className="mt-2 p-2 bg-gray-400 text-white rounded"
          >
            Close Recipe
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
