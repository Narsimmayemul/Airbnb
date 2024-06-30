const express = require('express');
const router = express.Router();
const {WineModule, userModule} = require('../connection/connection');
const authentication = require('../Auth/authentication');
// module.exports = router;

router.get('/'  , async(req , res)=>{
    try {
        const data = await WineModule.find();
        res.status(200).send(data);  
        // res.status(200).send('this is data Page');
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
  

module.exports = router;