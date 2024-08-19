import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {categorie} from "../models/categories.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const addCategory = asyncHandler(async(req,res)=>{

    const newCategory = await categorie.create({ ...req.body})
    return res
    .status(200)
    .json(new ApiResponse(200, newCategory, "Categories Successfully added"))
})

const allCategory = asyncHandler(async(req,res)=>{
    const Categorie = await categorie.find({})

    if(!Categorie){
        throw new ApiError(400, "Food is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Categorie, "Successfully fetch Categories"))
})

const updateCategory = asyncHandler(async(req,res)=>{
    const ID = req.params.id
    const newCategorie = req.body

    const Food = await categorie.updateOne({_id : ID},{$set: {...newCategorie}})

    return res
    .status(200)
    .json(new ApiResponse(200, "Categories Update Successfully"))
})


export {
    addCategory,
    allCategory,
    updateCategory
}