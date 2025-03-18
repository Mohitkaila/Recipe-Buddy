const express = require("express");
const authMiddleware = require("../middleware/auth"); // ✅ Corrected path
const Recipe = require("../models/Recipe");

const router = express.Router();

// ✅ Save Recipe (Only for Logged-In Users)
router.post("/save", authMiddleware, async (req, res) => {
  try {
    const { recipeText } = req.body;
    const userId = req.user.userId; // ✅ Extracted from the verified JWT

    if (!recipeText) {
      return res.status(400).json({ error: "Recipe text is required." });
    }

    const newRecipe = new Recipe({ userId, recipeText });
    await newRecipe.save();

    res.status(201).json({ message: "Recipe saved successfully!" });
  } catch (error) {
    console.error("Error saving recipe:", error);
    res.status(500).json({ error: "Server error. Could not save recipe." });
  }
});

// ✅ Get Saved Recipes (Only for Logged-In Users)
router.get("/saved", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const recipes = await Recipe.find({ userId });

    res.json(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    res.status(500).json({ error: "Server error. Could not fetch recipes." });
  }
});

module.exports = router;
