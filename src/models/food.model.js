import mongoose from "mongoose"

const foodSchema =  new mongoose.Schema({

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

    ingredients:[{
        type:String,
        required: true,
    }],

    categories:[{
        type:String,
        required: true,
    }],

    price:{
        type:Number,
        required: true,
        default: 0,
    },

    type:[{
        type:String,
        required: true,
    }],

    rating:{
        type:Number,
        default: 0,
    },

    hotel_id: {
        type:String,
        required: true,
    }
}) 

const food = mongoose.model("food",foodSchema);

export {food}