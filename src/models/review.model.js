import mongoose from "mongoose"

const reviewSchema =  new mongoose.Schema({

    user_name:{
        type:String,
        required:true,
    },
    
    description:{
        type:String,
        required: true,
    },

    rating:{
        type:Number,
        default: 0,
    },

    target_id:{
        type:String,
        required: true,
    }

},{timestamps:true}) 

const review = mongoose.model("review",reviewSchema);

export {review}