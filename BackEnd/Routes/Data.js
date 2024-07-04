const express = require('express');
const router = express.Router();
const {WineModule, userModule ,WishList ,CartData} = require('../connection/connection');
const authentication = require('../Auth/authentication');
// module.exports = router;

router.get('/'  , async(req , res)=>{
    try {
        const data = await WineModule.find();
        res.status(200).send(data);  
    } catch (error) {
        res.status(500).send('Error from get Fun:' + error.message)
    }
})


router.get('/DessertWine'  , async(req , res)=>{
  try {
      const data = await WineModule.find({category:"Dessert Wine"});
      res.status(200).send(data);  
  } catch (error) {
      res.status(500).send('Error from get Fun:' + error.message)
  }
})


router.get('/SparklingWine'  , async(req , res)=>{
  try {
      const data = await WineModule.find({category:"Sparkling Wine"});
      res.status(200).send(data);  
  } catch (error) {
      res.status(500).send('Error from get Fun:' + error.message)
  }
})

router.get('/RedWine'  , async(req , res)=>{
  try {
      const data = await WineModule.find({category:"Red Wine"});
      res.status(200).send(data);  
  } catch (error) {
      res.status(500).send('Error from get Fun:' + error.message)
  }
})

router.get('/WhiteWine'  , async(req , res)=>{
  try {
      const data = await WineModule.find({category:"White Wine"});
      res.status(200).send(data);  
  } catch (error) {
      res.status(500).send('Error from get Fun:' + error.message)
  }
})


router.get("/user/:id", async (req, res) => {
    const { id } = req.params;
  
    try {
      const data = await userModule.findById(id);
      if (!data) {
        return res.status(404).send('User not found');
      }
      res.status(200).json(data);
    } catch (error) {
      res.status(500).send("Error retrieving data: " + error);
    }
  });

  router.post('/cartpost', async (req, res) => {
    const data = req.body;
    try {
      console.log(data)
      const result = await CartData.create(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).send('Error from Post Cart Fun: ' + error.message);
    }
  });
  

  router.get('/cart/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const cartItems = await CartData.find({owner:id});
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).send('Error from Get Cart Fun: ' + error.message);
    }
  });
  
  router.delete('/cart/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await CartData.delete(id);
      res.status(200).send('Item deleted successfully');
    } catch (error) {
      res.status(500).send('Error from Delete Cart Fun: ' + error.message);
    }
  });


  router.post('/wish', async (req, res) => {
    const data = req.body;
    try {
      console.log(data)
      const result = await WishList.create(data);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).send('Error from Post wish Fun: ' + error.message);
    }
  });
  

  router.get('/wish/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const wishItems = await WishList.find({owner:id});
      res.status(200).json(wishItems);
    } catch (error) {
      res.status(500).send('Error from Get wish Fun: ' + error.message);
    }
  });
  
  router.delete('/wish/:id', async (req, res) => {
    const id = req.params.id;
    try {
      await WishList.delete(id);
      res.status(200).send('Item deleted successfully');
    } catch (error) {
      res.status(500).send('Error from Delete wish Fun: ' + error.message);
    }
  });
  
// WishList
module.exports = router;