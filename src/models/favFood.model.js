import mongoose from "mongoose"

const favFoodSchema =  new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    
    slug:{
        type:String
    },
    
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    food_ids:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'food'
    }]
}) 

const favFood = mongoose.model("favFood",favFoodSchema);

export {favFood}