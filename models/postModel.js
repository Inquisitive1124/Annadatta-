const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    address:{
        type:String,
        maxLength:70,
        required:true,
    }
})

module.exports = mongoose.model("Post",postSchema);