var dotenv = require('dotenv');
// load config
dotenv.config({path: './config.env'})

const mongoose = require('mongoose');

const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, ()=>{
            console.log("Mongodb Connected");
        })

        
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDB;