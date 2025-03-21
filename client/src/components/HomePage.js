import React from "react";
import { Boxes } from "./ui/BackgroundBoxes"; // Ensure correct import

const HomePage = ({ user, children }) => {
  return (
    <div className="relative bg-gray-900 text-white min-h-screen">
      {/* Top Section with Animated Background */}
      <div className="relative w-full h-[50vh] flex flex-col items-center justify-center overflow-hidden bg-gray-900 rounded-lg">
        {/* Apply Mask for Smooth Visual Effect */}
        <div className="absolute inset-0 w-full h-full bg-gray-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
        
        {/*Background Boxes */}
        <Boxes />

        {/* Title & Description */}
        <div className="relative z-20 text-center">
          <h1 className="md:text-4xl text-2xl font-bold text-white">
            Welcome, {user ? user.username : "Guest"}!
          </h1>
          <p className="text-lg text-gray-300 mt-2">Start Creating Your Recipe!</p>
        </div>
      </div>

      {/* Recipe Generator Section - Reduced Space */}
      <div className="relative z-10 bg-gray-900 py-6 flex justify-center">
        {children} {/* Injects the Hero Component */}
      </div>
    </div>
  );
};

export default HomePage;
