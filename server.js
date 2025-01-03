const express = require('express');
const devil = express();
const db = require('./db');
const bodyParser = require('body-parser');
// for call the passport function 
const passport = require('./auth');
// dotenv file ke library ko require 
require('dotenv').config();



// Middleware to parse JSON request bodies
devil.use(bodyParser.json());

const PORT = process.env.PORT || 4000 // for env connection 



//Middleware function 
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to this ${req.originalUrl}`);
  next(); // Move on to the next phase
}

//now i want to give  logrequest to all urls then we do 
devil.use(logRequest);
// TO authenticat the routes   
devil.use(passport.initialize());
// use middle ware to authenticate the url 
const localAuthMiddleware = passport.authenticate('local', { session: false })

// Define a basic GET route
devil.get('/', localAuthMiddleware, (req, res) => {
  res.send("<h1>Welcome to our Node.js server. This is my first experience with backend.</h1>");
});








// Import the router files from routes folder
const menuRoutes = require('./routes/menuRoutes')
const personRoutes = require('./routes/personRoutes');
// Use the routers
devil.use('/menu',localAuthMiddleware, menuRoutes);
devil.use('/person',localAuthMiddleware, personRoutes);


// Start the server
devil.listen(PORT, () => {
  console.log("Server is running on port 4000");
});
