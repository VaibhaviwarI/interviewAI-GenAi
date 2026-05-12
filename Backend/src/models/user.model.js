
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username : {
        type : String,
        unique : [true, "Username already taken"]
    },

    email : {
        type : String,
        unique : [true, "Account already exists with this email address"],
        required : true
    },

    password : {
        type : String,
        required : true
    }

}, {timestamps : true})

const userModel = mongoose.model("users",userSchema);

module.exports = userModel;