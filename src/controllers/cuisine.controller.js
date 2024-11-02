import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {cuisine} from "../models/cuisine.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { MakeSlug } from "../utils/MakeSlug.js"

const addCuisine = asyncHandler(async(req,res)=>{
    let cuisineData = req.body;
    let Slug = MakeSlug(cuisineData.name);

    cuisineData = {...cuisineData, slug: Slug};

    const newCuisine = await cuisine.create({ ...cuisineData})
    return res
    .status(200)
    .json(new ApiResponse(200, newCuisine, "New Cuisine Successfully added"))
})

const allCuisine = asyncHandler(async(req,res)=>{
    const Cuisine = await cuisine.find({})

    if(!Cuisine){
        throw new ApiError(400, "Cuisine is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Cuisine, "Successfully fetch Cuisines"))
})

const getCuisine = asyncHandler(async(req,res)=>{
    const ID = req.params.id;
    const Cuisine = await cuisine.find({_id: ID})

    if(!Cuisine){
        throw new ApiError(400, "Cuisine is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Cuisine, "Successfully fetch Cuisines"))
})

const updateCuisine = asyncHandler(async(req,res)=>{
    const ID = req.params.id;
    const newCuisine = req.body

    const Cuisine = await cuisine.updateOne({_id : ID},{$set: {...newCuisine}})

    return res
    .status(200)
    .json(new ApiResponse(200, "Cuisine Update Successfully"))
})

export {
    addCuisine,
    allCuisine,
    updateCuisine,
    getCuisine
}