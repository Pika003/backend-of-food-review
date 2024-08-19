import mongoose from "mongoose"

const categoriesSchema =  new mongoose.Schema({

    title:{
        type:String,
        required:true,
    },
    
    description:{
        type:String,
    },

    image:{
        type:String,
    },

    isActive:{
        type:Number,
        default: 1
    }
}) 

const categorie = mongoose.model("categorie",categoriesSchema);

export {categorie}