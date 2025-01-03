const express = require('express');
const router = express.Router();
const MenuItem  = require('../models/menu');

//menu item post method 
router.post('/', async (req, res) => {
    try {
      const data = req.body; 
  
      // Basic validation for required fields
      if (!data.name || typeof data.name !== 'string') {
        return res.status(400).json({ error: "Invalid or missing 'name'" });
      }
      if (!data.price || typeof data.price !== 'number') {
        return res.status(400).json({ error: "Invalid or missing 'price'" });
      }
  
      // Create a new MenuItem document
      const newMenu = new MenuItem(data);
  
      // Save the document
      const response = await newMenu.save();
      console.log('Data saved:', response);
      res.status(200).json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  router.get('/',async(req,res)=>{
    try{
      const data = await MenuItem.find();// Extract data from request body
  
      console.log('Data fetched');
      res.status(200).json(data);
    }catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } 
  }) 
  router.put('/:id',async(req,res)=>{
    try{
      const menuId = req.params.id;
      const updatedPersonData = req.body;

      const response = await MenuItem.findByIdAndUpdate(menuId,updatedPersonData,{
        new:true,//return  the update document
        runValidators:true,//Run Mongoose validation
      })
      if(!response){
        return res.status(404).json({error:'menu not found '})
      }
      console.log('Data updated');
      res.status(200).json(response);
    }
    catch(err){
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    
    }
  })
  module.exports = router;