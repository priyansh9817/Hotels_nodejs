const express = require('express');
const devil = express();
const db = require('./db');
const bodyParser = require('body-parser');
// dotenv file ke library ko require 
require('dotenv').config();
// Middleware to parse JSON request bodies
devil.use(bodyParser.json());
const PORT = process.env.PORT || 4000 // for env connection 
// Define a basic GET route
devil.get('/', (req, res) => {
  res.send("hey"); 
});     



// Import the router files from routes folder
const menuRoutes = require('./routes/menuRoutes')
const personRoutes = require('./routes/personRoutes');
// Use the routers
devil.use('/menu', menuRoutes);
devil.use('/person', personRoutes);


// Start the server
devil.listen(PORT, () => {
  console.log("Server is running on port 4000");
});
 