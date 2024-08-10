import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {food} from "../models/food.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const addFood = asyncHandler(async(req,res)=>{

    const newFood = await food.create({ ...req.body})
    return res
    .status(200)
    .json(new ApiResponse(200, newFood, "Food Successfully added"))
})

const allFood = asyncHandler(async(req,res)=>{
    const Food = await food.find({})

    if(!Food){
        throw new ApiError(400, "Food is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Food, "Successfully fetch food"))
})

//Optimized can be done
const getFoodByName = asyncHandler(async(req,res)=>{
    const FoodName = req.params.foodName;

    const Food = await food.find({title : FoodName})

    return res
    .status(200)
    .json(new ApiResponse(200, Food, "Successfully fetch"))
})

const getFood = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const Food = await food.findOne({_id : id})

    if(!Food){
        throw new ApiError(400, "Food is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Food, "Successfully found"))
})

const delFood = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const Food = await food.findByIdAndDelete({_id : id})

    return res
    .status(200)
    .json(new ApiResponse(200, "Food Delete Successfully"))
})




export {
    addFood,
    allFood,
    getFood,
    getFoodByName,
    delFood
}