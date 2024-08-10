import mongoose from "mongoose"

const hotelSchema =  new mongoose.Schema({

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

    time_slot: {
        opening_time: {
            type: Number,
        },
        closing_time: {
            type: Number,
        }
    },

    categories:[{
        type:String,
        required: true,
    }],

    price:{
        type:Number,
        required: true,
        default: 0,
    },

    rating:{
        type:Number,
        default: 0,
    },

    total_rating:{
        type:Number,
        default: 0,
    },

    // food: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'food'
    // },

    // map:{
    //     type: Location,
    // }
}) 

const hotel = mongoose.model("hotel",hotelSchema);

export {hotel}