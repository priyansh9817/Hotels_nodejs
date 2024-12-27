// Here we make schema for data bases

const mongoose = require('mongoose');

// Define the person schema 
const  personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    }, 
    work:{
        type:String,
        enum:['chef','waiter','manager'], // enum is used to store only which value which is passed 
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true  // yaha pe unique ka mtlb hai ki same email id se ek baar se jyda koi data me store nhi kar shkata hai 
    },
    salary:{
        type:String,
        required:true
    }
});
const Person = mongoose.model('Person',personSchema);
module.exports = Person;