// This file is responsible for establishing the connection between Node.js and the database.

const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
// For local connection
//const mongoURL = process.env.MongoDB_URL // Replace the database name with your own name


const mongoURL = process.env.DB_URL
//^^^ For MongoDB Atlas connection (online setup)


if (!mongoURL) {
    console.error("MongoDB URL is undefined. Check your .env file.");
    process.exit(1);
}
//const mongoURL = process.env.MONGO_URI;

// Set up MongoDB connection
mongoose.connect(mongoURL);

// Get the default connection
// Mongoose maintains a default connection object representing the connection
const db = mongoose.connection;

// Define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('Error connecting to MongoDB:', err);
});

db.on('disconnected', () => {
    console.log('Disconnected from MongoDB server');
});

// Export the db connection
module.exports = db;
