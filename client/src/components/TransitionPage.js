import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { WavyBackground } from "./ui/WavyBackground";

export default function TransitionPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically navigate after 3 seconds
    setTimeout(() => {
      navigate("/home");
    }, 4000);
  }, [navigate]);

  return (
    <WavyBackground className="text-center">
  <h1 className="text-5xl font-bold text-white">
    WELCOME TO THE FUTURE OF COOKING 
  </h1>
</WavyBackground>
  );
}
