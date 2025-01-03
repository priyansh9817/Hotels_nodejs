// Here we make schema for data bases

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
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
    },
    username:{
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    }
});

personSchema.pre('save', async function (next) {
    const person = this;
    // Hash the password only if it has been modified 
    if(!person.isModified('password')) return next ();

    try{
        // hash password generate 
        const salt = await bcrypt.genSalt(10);

        // hash password
        const hashedPassword = await bcrypt.hash(person.password , salt)
        person.password  = hashedPassword;

        next();
    }
    catch(err){
        return next(err);
    }
})
personSchema.methods.comparePassword = async function(candidatePassword){
    try{
        // use bycrypt to compare the provied password with the hashed password 
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }
    catch(err){
        throw err
    }
}
// priyanshu --> kjdshbfbcqA8ISW3249783
//login --->agrawak

// kjdshbfbcqA8ISW3249783 ---> extract salt 
// salt + agrawak -->hash -->kjdahsfslodsulhfs
const Person = mongoose.model('Person',personSchema);
module.exports = Person;