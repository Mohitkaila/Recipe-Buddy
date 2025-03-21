// server.js

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const OpenAI = require("openai");

// Load environment variables
dotenv.config({ path: "../.env" });

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB Atlas!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Import routes
const authRoutes = require("./routes/auth");
const recipeRoutes = require("./routes/recipes"); // Import Recipe Routes

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipeRoutes); // Add Recipe Routes

// SSE Recipe Generation Endpoint (Fixed Title Handling)
app.get("/recipeStream", (req, res) => {
  const { ingredients, cuisine, cookingTime, complexity, people, note } = req.query;

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Function to send messages
  const sendEvent = (chunk) => {
    if (chunk.choices[0].finish_reason === "stop") {
      res.write(`data: ${JSON.stringify({ action: "close" })}\n\n`);
    } else {
      res.write(`data: ${JSON.stringify({ action: "chunk", chunk: chunk.choices[0].delta.content })}\n\n`);
    }
  };

  // Include the note if provided by the user
  const customNote = note ? `Please ensure the recipe meets the following requirement: ${note}.` : "";

  // Updated OpenAI Prompt (Ensures Clear Title Extraction)
  const prompt = `
    Generate a recipe in a structured format. The first line **must** contain the dish name as follows:
    **Recipe Title:** [Dish Name]
    
    ---
    **Recipe Title:** [Native Dish Name] ([English Translation]) - ${cuisine} Style

    This recipe is for ${people} servings and takes around ${cookingTime}. Complexity: ${complexity}.

    **Recipe at a Glance:**
    - Cooking Time: ${cookingTime}
    - Complexity: ${complexity}
    - Serves: ${people}
    - Main Ingredients: ${ingredients}

    **Ingredients You’ll Need:**
    - List each ingredient with clear formatting.

    **Step-by-Step Instructions:**
    1. Provide clear step-by-step instructions.

    **Nutritional Summary (per serving):**
    - Calories: [value]
    - Carbohydrates: [value]
    - Proteins: [value]
    - Fats: [value]

    **Tips for a Perfect Dish:**
    - Provide expert cooking tips.

    ---
    Ensure the recipe starts with "**Recipe Title:** [Dish Name]".
  `;

  console.log("🔍 Sending Prompt to OpenAI:", prompt); // Debugging Log

  const messages = [
    { role: "system", content: "You are a recipe assistant that provides structured recipes in plain text format with bold headings." },
    { role: "user", content: prompt },
  ];

  fetchOpenAICompletionsStream(messages, sendEvent);

  req.on("close", () => res.end());
});

// Function to Fetch AI Data and Debug Response
async function fetchOpenAICompletionsStream(messages, callback) {
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: messages,
      temperature: 1,
      stream: true,
    });

    for await (const chunk of completion) {
      console.log("📝 AI Response Chunk:", chunk.choices[0].delta.content); // Debug AI Response
      callback(chunk);
    }
  } catch (error) {
    console.error("❌ Error fetching data from OpenAI API:", error);
  }
}

// Start the server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
