const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true }, // Make sure "title" is defined
  recipeText: { type: String, required: true },
});

module.exports = mongoose.model("Recipe", RecipeSchema);
