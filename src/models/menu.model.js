import mongoose from "mongoose"

const menuSchema =  new mongoose.Schema({

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

const menu = mongoose.model("menu",menuSchema);

export {menu}