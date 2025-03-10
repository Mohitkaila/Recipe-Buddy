const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

// Create a connection to MySQL (without specifying the database initially)
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // replace with your user name
  password: 'your password', // Replace with your MySQL password
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL!');
  setupDatabase(); // Run the function to set up the database
});

// Function to check if the database exists, and if not, create it
function setupDatabase() {
  connection.query('SHOW DATABASES LIKE "recipe_buddy_database"', (err, results) => {
    if (err) {
      console.error('Error checking databases:', err);
      return;
    }

    if (results.length === 0) {
      console.log('Database "recipe_buddy" not found, creating...');
      // Create the database if it doesn't exist
      connection.query('CREATE DATABASE recipe_buddy', (err) => {
        if (err) {
          console.error('Error creating database:', err);
          return;
        }
        console.log('Database "recipe_buddy" created successfully!');
        initializeDatabase(); // Initialize tables after creating the database
      });
    } else {
      console.log('Database "recipe_buddy" already exists!');
      initializeDatabase(); // If database exists, initialize tables
    }
  });
}

// Function to initialize tables from the .sql file
function initializeDatabase() {
  // Switch to the 'recipe_buddy' database
  connection.query('USE recipe_buddy', (err) => {
    if (err) {
      console.error('Error selecting database:', err);
      return;
    }
    console.log('Using database "recipe_buddy"');
    // Path to the SQL schema file
    const sqlFilePath = path.join(__dirname, 'recipe_buddy_database.sql');
    
    // Read the SQL file and execute the queries
    fs.readFile(sqlFilePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error reading the SQL file:', err);
        return;
      }

      // Execute the SQL queries from the file
      connection.query(data, (err) => {
        if (err) {
          console.error('Error creating tables:', err);
        } else {
          console.log('Tables created successfully or already exist!');
        }
        connection.end(); // Close the connection after the queries are executed
      });
    });
  });
}

// Export the connection object to use it in other files
module.exports = connection;
