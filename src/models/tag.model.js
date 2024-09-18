import mongoose from "mongoose"

const tagSchema =  new mongoose.Schema({

    name:{
        type:String,
        required:true,
    },
    
    slug:{
        type:String
    }

},{timestamps:true}) 

const tag = mongoose.model("tag",tagSchema);

export {tag}