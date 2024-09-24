import mongoose from "mongoose"

const tagSchema =  new mongoose.Schema({

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

const tag = mongoose.model("tag",tagSchema);

export {tag}