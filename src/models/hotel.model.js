import mongoose from "mongoose"

const hotelSchema =  new mongoose.Schema({

    hotel_name:{
        type:String,
        required:true,
    },

    slug:{
        type:String
    },

    phone:{
        type:Number,
        required:true,
    },

    opening: {
        type: String,
    },

    closing: {
        type: String,
    },

    address:{
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

    isActive:{
        type:Number,
        default: 1,
    },

    rating:{
        type:Number,
        default: 0,
    },

}, {timestamps : true}) 

const hotel = mongoose.model("hotel",hotelSchema);

export {hotel}