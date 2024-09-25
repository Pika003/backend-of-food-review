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

    menus:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu'
    }],

    images:[{
        type:String,
    }],

    fetured_image:{
        type:String,
    },

    opening: {
        type: String,
    },

    closing: {
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