import mongoose from "mongoose"

const blogSchema =  new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },

    slug:{
        type:String
    },
    
    description:{
        type:String,
        required: true,
    },

    image:{
        type:String,
        required: true,
    },

    status:{
        type:Number,
        default: 1,
    }
},{timestamps:true}) 

const blog = mongoose.model("blog",blogSchema);

export {blog}