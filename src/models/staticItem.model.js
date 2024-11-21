import mongoose from "mongoose"

const staticItemSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    
    slug:{
        type:String
    },

    content:{
        type:String
    },

    isActive:{
        type:Number,
        default: 1,
    }

},{timestamps:true}) 

const staticItem = mongoose.model("staticItem",staticItemSchema);

export {staticItem}