const mongoose = require('mongoose')

async function connectDB(){

    try{

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to the Database")

    }catch(err){
        console.log("Error in Connecting to the database");
  }

}

module.exports = connectDB;
