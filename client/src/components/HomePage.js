import React from "react";
// Correct import using the named export 'Boxes' from BackgroundBoxes.js
import { Boxes } from "./ui/BackgroundBoxes"; // Corrected import for named export

const HomePage = ({ user, onLogout }) => {
  return (
    <div className="relative">
      {/* Background Boxes at the top of the page */}
      <Boxes
        className="fixed top-0 left-0 w-full h-[60vh] z-10" // Adjust the height as needed
        waveOpacity={0.6} // You can adjust the opacity or other properties as needed
      >
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white">
          <h1 className="text-6xl font-bold">Welcome to the Future of Cooking</h1>
          <p className="text-lg mt-4">Your AI-powered Recipe Experience</p>
        </div>
      </Boxes>

      {/* Main content below the Background Boxes */}
      <div className="pt-[60vh]"> {/* Padding to make space for the Background Boxes */}
        <div className="p-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl font-semibold mb-6">Start Creating Your Recipe!</h2>
          {/* Assuming RecipeCard is your form component */}
          <RecipeCard onSubmit={onLogout} /> 
        </div>
      </div>
    </div>
  );
};

export default HomePage;
