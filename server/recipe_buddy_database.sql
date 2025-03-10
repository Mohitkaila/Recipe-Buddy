CREATE DATABASE recipe_buddy;
USE recipe_buddy;
-- Creating table for storing recipes
CREATE TABLE IF NOT EXISTS recipes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  ingredients TEXT,
  instructions TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Creating table for storing users
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
