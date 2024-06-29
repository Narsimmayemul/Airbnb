const express = require('express');
const app = express();
const CORS = require('cors');
app.use(CORS());
require('dotenv').config();
app.use(express.json());
const {userModule , connection , placeModule} = require('./connection/connection')


const PORT = process.env.PORT || 3000;


const signupRouter= require('./Routes/Signup');
const signinRouter = require('./Routes/Login');
const dataRouter = require('./Routes/Data');
const verifyRouter = require('./Routes/Verify');


app.use('/api/signup', signupRouter);
app.use('/api/signin', signinRouter);
app.use('/api/WineData', dataRouter);
app.use('/api/verify' , verifyRouter);

app.get("/" , (req ,res)=>{
    try {
        res.status(200).send("This Is Home Page");
    } catch (error) {
        console.log(error)
    }
})


app.listen( PORT , ()=>{
    try {
        if(connection){
            console.log(`connection started on ${PORT}`)
        }else{
            throw new Error();
        }
    } catch (error) {
        console.log(error)
    }
})