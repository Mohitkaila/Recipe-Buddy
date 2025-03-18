import React, { useState } from "react";

const RecipeCard = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    ingredients: "",
    mealType: "",
    cuisine: "",
    cookingTime: "",
    complexity: "",
    people: "",
    note: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !formData.ingredients ||
      !formData.mealType ||
      !formData.cuisine ||
      !formData.cookingTime ||
      !formData.complexity ||
      !formData.people
    ) {
      alert("Please fill in all required fields");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full">
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-white text-center">Recipe Generator</h2>
      <div className="space-y-4">
        {[
          { label: "Ingredients", id: "ingredients", type: "text", placeholder: "e.g., chicken, rice" },
          { label: "Meal Type", id: "mealType", type: "select", options: ["Breakfast", "Lunch", "Dinner", "Snack"] },
          { label: "Cuisine", id: "cuisine", type: "text", placeholder: "e.g., Italian, Mexican" },
          { label: "Cooking Time", id: "cookingTime", type: "select", options: ["< 30 mins", "30-60 mins", "> 1 hour"] },
          { label: "Complexity", id: "complexity", type: "select", options: ["Beginner", "Intermediate", "Advanced"] },
          { label: "Number of People", id: "people", type: "number", placeholder: "e.g., 4" }
        ].map(({ label, id, type, options, placeholder }) => (
          <div key={id}>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1" htmlFor={id}>{label}</label>
            {type === "select" ? (
              <select
                id={id}
                value={formData[id]}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            ) : (
              <input
                id={id}
                type={type}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
              />
            )}
          </div>
        ))}
        <div>
          <label className="block text-gray-700 dark:text-gray-300 font-medium mb-1" htmlFor="note">Note (Optional)</label>
          <input
            id="note"
            type="text"
            placeholder="Any specific requirements (e.g., lactose-free)"
            value={formData.note}
            onChange={handleChange}
            className="w-full border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-300"
      >
        Generate Recipe
      </button>
    </div>
  );
};

const Hero = ({ onRecipeSubmit }) => {
  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4">
      <RecipeCard onSubmit={onRecipeSubmit} />
    </section>
  );
};

export default Hero;
