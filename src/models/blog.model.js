import mongoose from "mongoose"

const blogSchema =  new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    
    description:{
        type:String,
        required: true,
    },

    image:{
        type:String,
        required: true,
    },

    // user_id:{
    //     type:String,
    //     required: true,
    // },

    // target_id:{
    //     type:String,
    //     required: true,
    // }

},{timestamps:true}) 

const blog = mongoose.model("blog",blogSchema);

export {blog}