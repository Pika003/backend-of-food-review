import mongoose from "mongoose"

const imageSchema =  new mongoose.Schema({

    name:{
        type:String,
    },
    
    url:{
        type:String
    }

},{timestamps:true}) 

const image = mongoose.model("image",imageSchema);

export {image}