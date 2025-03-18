const express = require("express");
const authMiddleware = require("../middleware/auth");
const Recipe = require("../models/Recipe");

const router = express.Router(); // ✅ Initialize Router

// ✅ Save Recipe Route
router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { recipeText } = req.body;
    const userId = req.user.userId;

    if (!recipeText) {
      return res.status(400).json({ error: "Recipe text is required." });
    }

    // ✅ Extract title from the first non-empty line
    const title = recipeText
      .split("\n")
      .map((line) => line.trim())
      .find((line) => line.length > 0) || "Untitled Recipe";

    console.log("Extracted Title:", title); // ✅ Debugging Log

    const newRecipe = new Recipe({ userId, title, recipeText });
    await newRecipe.save();

    res.status(201).json({ message: "Recipe saved successfully!", title });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Server error. Could not save recipe." });
  }
});

// ✅ Get Saved Recipes
router.get("/saved", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const recipes = await Recipe.find({ userId }, "title recipeText");

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Server error. Could not fetch recipes." });
  }
});

module.exports = router; // ✅ Export Router
