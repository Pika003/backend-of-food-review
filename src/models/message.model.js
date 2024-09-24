import mongoose from "mongoose"

const messageSchema =  new mongoose.Schema({

    email:{
        type:String,
        required:true,
    },
    
    name:{
        type:String,
        required: true,
    },

    message:{
        type:String,
        required: true,
    },

    status:{
        type:String,
        default: "true",
    }
},{timestamps:true}) 

const message = mongoose.model("message",messageSchema);

export {message}