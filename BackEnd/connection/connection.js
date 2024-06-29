require('dotenv').config();
const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.mongooseURL);

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    verificationCode: { type: String },
    isVerified: { type: Boolean, default: false }
});

const placeSchema = mongoose.Schema({
    image : {type : String , required:true},
    location : {type:String , required:true},
    distance : {type:String , required:true},
    date : {type :String , required:true},
    price: {type:Number , required:true},
    star : {type:Number , required:true}
})

const placeModule = mongoose.model('place' , placeSchema);
const userModule = mongoose.model('User' , userSchema);


module.exports = {userModule , connection , placeModule}