import mongoose from "mongoose"

const hotelSchema =  new mongoose.Schema({

    hotel_name:{
        type:String,
        required:true,
    },

    slug:{
        type:String
    },

    url:{
        type:String
    },

    images:[{
        type:String,
    }],

    price:[{
        type:String,
    }],

    featured_image:{
        type:String,
    },

    opening: {
        type: String,
    },

    closing: {
        type: String,
    },

    breakfast_time: {
        type: String,
    },

    lunch_time: {
        type: String,
    },

    dinner_time: {
        type: String,
    },

    type:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'type'
    }],

    menus:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu'
    }],

    cuisines:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cuisine'
    }],
    
    description:{
        type:String,
        required: true,
    },

    isActive:{
        type:Number,
        default: 1,
    }

}, {timestamps : true}) 

const hotel = mongoose.model("hotel",hotelSchema);

export {hotel}