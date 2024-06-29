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

const WineSchema = mongoose.Schema({
    id: {type  : Number , required:true},
    img_url : {type : String , required:true},
    name : {type:String , required:true},
    category : {type:String , required:true},
    flag : {type :String , required:true},
    price: {type:Number , required:true},
    rating : {type:Number , required:true}
})

const WineModule = mongoose.model('WineData' , WineSchema);
const userModule = mongoose.model('User' , userSchema);


module.exports = {userModule , connection , WineModule}