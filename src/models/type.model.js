import mongoose from "mongoose"

const typeSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    
    slug:{
        type:String
    },

    isActive:{
        type:Number,
        default: 1,
    }

},{timestamps:true}) 

const type = mongoose.model("type",typeSchema);

export {type}