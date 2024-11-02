import mongoose from "mongoose"

const foodSchema =  new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },

    slug:{
        type:String
    },

    served_with:{
        type:String
    },

    ingredients:{
        type:String
    },
    
    description:{
        type:String,
        required: true,
    },

    images:[{
        type:String,
    }],

    featured_image:{
        type:String,
    },

    price:{
        type:Number,
        required: true,
        default: 0,
    },

    editor_review: {
        type:String,
    },

    history: {
        type:String,
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

    // cuisines:[{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'cuisine'
    // }],

    isActive:{
        type:Number,
        default: 1,
    }
}) 

const food = mongoose.model("food",foodSchema);

export {food}