// This file is responsible for enstablishi the connection btw node.js and data base 

const mongoose = require('mongoose');
// Define the mongodb connection URL

const mongoURL = 'mongodb://localhost:27017/hotels' // Replace the database name by own name 

//  set up MongoDB connection

mongoose.connect(mongoURL,{
    
})
// Get the default connection 
// Mongoose maintains a default connection object representing the connection 

const db = mongoose.connection;
// Define event listner for data bases connection

db.on('connected',()=>{
    console.log("connected to mongodb server");
});
db.on('error',()=>{
    console.log(" error");
});
db.on('disconnected',()=>{
    console.log("disconnected to mongodb server");
});

// export db connection
module.exports = db;