const express = require('express');
const router = express.Router();
const {WineModule} = require('../connection/connection');
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

router.get("/data" , async (req ,res)=>{
    try {
        const data = await WineModule.find();
        res.status(200).send(data);        
    } catch (error) {
        res.status(500).send("error from get data :" + error);
    }
})

module.exports = router;