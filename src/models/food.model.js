import mongoose from "mongoose"

const foodSchema =  new mongoose.Schema({

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

    images:[{
        type:String,
    }],

    fetured_image:{
        type:String,
    },

    price:{
        type:Number,
        required: true,
        default: 0,
    },

    tags:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tag'
    }],

    venues:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'hotel'
    }],

    menus:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'menu'
    }],

    status:{
        type:Number,
        default: 1,
    }
}) 

const food = mongoose.model("food",foodSchema);

export {food}