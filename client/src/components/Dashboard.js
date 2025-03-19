import React, { useState, useEffect, useRef } from "react";
import { jsPDF } from "jspdf";

const Dashboard = ({ user }) => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const pdfRef = useRef();

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

  const handleDeleteRecipe = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/recipes/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete recipe.");
      }

      setSavedRecipes((prevRecipes) => prevRecipes.filter((recipe) => recipe._id !== id));
    } catch (error) {
      console.error("Error deleting recipe:", error);
      setError("Failed to delete recipe.");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Saved Recipes", 10, 10);

    savedRecipes.forEach((recipe, index) => {
      doc.text(`${index + 1}. ${recipe.title || "Untitled Recipe"}`, 10, 20 + index * 10);
    });

    doc.save("Saved_Recipes.pdf");
  };

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome, {user?.username || "Guest"}!</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Saved Recipes</h2>
        <button
          onClick={handleDownloadPDF}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
        >
          📄 Download PDF
        </button>
      </div>

      {loading && <p className="text-gray-300">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && savedRecipes.length === 0 && <p className="text-gray-400">No saved recipes yet.</p>}

      {!loading && savedRecipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savedRecipes.map((recipe) => (
            <div key={recipe._id} className="p-4 bg-gray-800 rounded-lg shadow">
              <h3 className="text-lg font-bold">{recipe.title || "Untitled Recipe"}</h3>
              <button
                onClick={() => setSelectedRecipe(recipe)}
                className="mt-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                View
              </button>
              <button
                onClick={() => handleDeleteRecipe(recipe._id)}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 ml-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedRecipe && (
        <div className="mt-6 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold">{selectedRecipe.title}</h3>
          <p className="whitespace-pre-line mt-2">{selectedRecipe.recipeText}</p>
          <button
            onClick={() => setSelectedRecipe(null)}
            className="mt-4 px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
