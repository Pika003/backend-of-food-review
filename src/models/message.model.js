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

    // profileImg:{
    //     type:String,
    //     required: true,
    // },

    status:{
        type:String,
        default: "true",
    }
}) 

const message = mongoose.model("message",messageSchema);

export {message}