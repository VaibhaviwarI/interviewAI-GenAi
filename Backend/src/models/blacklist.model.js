const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({

    token : {
        type : String, 
        required : [true, "Token is missing"]
    }

})


const blacklistModel = mongoose.model("blacklistModel",blacklistSchema)

module.exports = blacklistModel;