import mongoose from "mongoose"

const cuisineSchema =  new mongoose.Schema({

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

const cuisine = mongoose.model("cuisine",cuisineSchema);

export {cuisine}