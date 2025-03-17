import React, {useRef} from "react";
import {useNavigate} from "react-router-dom";
import background_image from "../assets/home_background.jpg";
import { Container, Typography, Button, Grid2 } from "@mui/material";
import Hero from "./Hero";

const HomePage = ({ user, onLogout }) => {
  const recipeCardRef = useRef(null);

  const scrollToRecipeCard = () => {
    recipeCardRef.current?.scrollIntoView({behavior: "smooth"});
  };

  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login");
  };
  return (
    <>
      <div className="relative w-full">
        {/*Background Image*/}
        <img 
          src={background_image} 
          alt="Background" 
          className="w-full h-auto object-cover mb-10"
        />
        {/*Overlapping text and buttons*/}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-black bg black bg-opacity-50">
          <h1 className="text-6xl font-bold md:text-7xl lg:text-8xl mb-2">Recipe Buddy</h1>
          <p className="text-2xl md:text-3xl lg:text-4xl mb-20">Your AI Chef</p>

          {/*Buttons under text*/}
          <div style={{display: "flex", gap: "10px", justifyContent: "center"}}>
            <Button 
              variant="contained" 
              color="success" 
              sx={{
                fontSize: "1.5rem",
                padding: "8px 24px",
              }}
              className="mt-6" 
              onClick={handleLoginRedirect}>
                Login
            </Button>
            <Button
              variant="contained"
              color="success"
              sx={{
                fontSize: "1.5rem",
                padding: "8px 24px",
              }}
              className="mt-6">
              {/*onClick={scrollToRecipeCard}>*/}
                Get Started
            </Button>
          </div>
        </div>
      </div>
      <Container maxWidth="sm">
        <Grid2 container justifyContent="center" alignItems="center" direction="column">
          <Typography variant="h4">Welcome, {user?.username || "Guest"}!</Typography>
      
          {/*Show logout button only if the user is logged in*/}
          {user && (
            <Button variant="contained" color="success" onClick={onLogout}>
              Logout
            </Button>
          )}
        </Grid2>
      </Container>

      {/*RecipeCard that the Get Started button scrolls to*/}
      {/*<div ref={recipeCardRef}>*/}
      {/*<Hero recipeCardRef={recipeCardRef}/>*/}
      {/*</div>*/}
    </>
  );
};

export default HomePage;
