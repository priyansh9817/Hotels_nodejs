const express = require('express');
const router = express.Router();
const Person = require('../models/person');

  // Define a POST route to add a new person
  router.post('/', async (req, res) => {
    try {
      const data = req.body; // Extract data from request body
  
      // Create a new Person document using the Mongoose model
      const newPerson = new Person(data);
  
      // Save the new person document
      const response = await newPerson.save();
      console.log('Data saved:', response);
      res.status(200).json(response); 
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  // get method 
  router.get('/',async(req,res)=>{
    try{
      const data = await Person.find();// Extract data from request body
  
      console.log('Data fetched');
      res.status(200).json(data);
    }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  // now i want to give parametrized endpoints
//It can be dynamically inserted into the URL when making a request to the ApI

router.get('/:worktype', async (req, res) => {
    try {
      const { worktype } = req.params;  // Get worktype from the URL parameter
  
      if (worktype === 'chef' || worktype === 'manager' || worktype === 'waiter') {
        const response = await Person.find({ work: worktype });
        res.status(200).json(response);  // Send the fetched data back as a response
      } else {
        res.status(400).json({ error: 'Invalid worktype' });  // Handle invalid worktype
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

 
  // for update method 
  router.put('/:id',async(req,res)=>{
    try{
      const personId = req.params.id; // extract the id from url parameters 
      const updatedPersonData = req.body;// update data for the person 

      const response  = await Person.findByIdAndUpdate(personId, updatedPersonData ,{
        new:true,//return  the update document
        runValidators:true,//Run Mongoose validation

      })
      if(!response){
        return res.status(404).json({error:'person not found '})
      }
      console.log('Data updated');
      res.status(200).json(response);
    }
    catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  })

  router.delete(',:id',async(req,res)=>{
    try{
      const personId = req.params.id; // extract the id from url parameters 
      const response = await Person.findByIdAndRemove(personId);
      if(!response){
        return res.status(404).json({error:'person not found '})
      }
      console.log('data delete');
      res.status(200).json({message:'person deleted success fully'})
    }
    catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }

  })
  module.exports = router;