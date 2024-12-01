import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {favFood} from "../models/favFood.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { MakeSlug } from "../utils/MakeSlug.js"

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const addFavFoodList = asyncHandler(async(req,res)=>{
    let FavFoodListData = req.body;
    let Slug = MakeSlug(FavFoodListData.title);

    FavFoodListData = {...FavFoodListData, slug: Slug};

    const newList = await favFood.create({ ...FavFoodListData})
    return res
    .status(200)
    .json(new ApiResponse(200, newList, "New Fav List Successfully added"))
})

const allFavFoodList = asyncHandler(async(req,res)=>{
    const ID = req.params.id;
    // const favFoods = await favFood.find({user_id: ID})

    const favFoods = await favFood.aggregate([
        {
          $match: { user_id : { $in: [new ObjectId(ID)] } }
        },
        {
          $lookup: {
            from: "foods",       
            localField: "food_ids",      
            foreignField: "_id",    
            as: "foodDetails"        
          }
        }
    ])

    if(!favFoods){
        throw new ApiError(400, "favFood is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, favFoods, "Successfully fetch favFoods"))
})

const getFavFoodList = asyncHandler(async(req,res)=>{
    const ID = req.params.id;
    const Foods = await favFood.find({_id: ID})

    if(!Foods){
        throw new ApiError(400, "FoodList is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Foods, "Successfully fetch Foods"))
})

const updateFavFoodList = asyncHandler(async(req,res)=>{
    const ID = req.params.id
    const {newFoodId} = req.body

    let FoodList = await favFood.findById(ID)

    if (!FoodList) {
        return res
            .status(404)
            .json(new ApiResponse(404, "Favorite Food List not found"));
    }

    if (!FoodList.food_ids) {
        FoodList.food_ids = [];
    }

    // Check if newFoodId already exists in the food_ids array
    const exists = FoodList.food_ids.some((id) => id.equals(newFoodId));
    if (!exists) {
        FoodList.food_ids.push(newFoodId);
        await FoodList.save();
    }
    

    return res
    .status(200)
    .json(new ApiResponse(200, "FavFoodList Update Successfully"))
})

export {
    allFavFoodList,
    addFavFoodList, 
    getFavFoodList, 
    updateFavFoodList
}