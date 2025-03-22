# Recipe Buddy

> **An AI-powered Recipe Generator that lets users discover new recipes using ingredients they already have. Enhance your cooking experience with a touch of AI!**

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **AI Recipe Generation**: Generates creative recipes based on user inputs such as ingredients, cuisine, meal type, and more.
- **Download as PDF**: Users can download generated recipes as a PDF file.
- **User-Friendly Interface**: Clean and interactive design with responsive layout.
- **3D Interactive Image**: Includes a dynamic 3D image effect to make the interface more engaging.
- **User Authentication**: Allow users to save their favorite recipes.
- **Nutrition Information**: Provide nutritional details for each recipe.

## Tech Stack

- **Frontend**: React, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express (API for handling recipe generation)
- **AI API**: OpenAI API (for generating recipe content)
- **PDF Generation**: jsPDF (for converting recipe content to PDF)

---

## Getting Started

To set up and run this project locally, follow these steps:

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ducbinhminhman/RecipeGenerator.git
   cd recipe-generator
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add your OpenAI API key:

   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the development server:**

   ```bash
   npm start
   ```

5. **Run the backend server:**

   Open another terminal window and navigate to the `server` folder, then run:

   ```bash
   node server.js
   ```

---

## Usage

1. **Enter Ingredients**: Type in the ingredients you have on hand.
2. **Choose Meal Preferences**: Select meal type, cuisine, cooking time, and complexity level.
3. **Generate Recipe**: Click "Generate Recipe" to get a custom AI-generated recipe.
4. **Download as PDF**: Option to download the generated recipe as a PDF file.

> **Note:** Make sure your backend server is running to fetch recipes from the OpenAI API.

---

## Project Structure

```plaintext
recipe-generator/
├── public/              # Public assets
├── src/
│   ├── assets/          # Images and static files
│   ├── components/      # Reusable components (RecipeCard, RecipeDisplay, Hero, etc.)
│   ├── App.js           # Main application component
│   └── index.js         # React DOM rendering
├── server/
│   └── server.js        # Backend API for recipe generation
├── .env                 # Environment variables (OpenAI API Key)
├── package.json         # Project metadata and scripts
└── README.md            # Project documentation
```

---
## Generative AI Usage
Generative AI, namely ChatGPT, assisted in developing this project. The tool was primarily utilized for debugging and giving example implementations for functions. Using ChatGPT was beneficial to our learning experience as well as our project since it allowed us to learn different ways to implement desired functionality and improve our overall project by identifying and removing errors. The only challenge we encountered while using AI was getting it to assist in debugging errors that were specific to our project since it often only gave a brief overview of errors and ways to fix them. 
### Citation
OpenAI. (2024). ChatGPT (March 21 version) [Large language model]. https://openai.com/chatgpt 

