import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {food} from "../models/food.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { MakeSlug } from "../utils/MakeSlug.js"

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const addFood = asyncHandler(async(req,res)=>{
    let foodData = req.body;
    let Slug = MakeSlug(foodData.title);

    foodData = {...foodData, slug: Slug};

    const newFood = await food.create({ ...foodData})
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

    const Food = await food.find({$text: {$search: FoodName}}).limit(15)

    return res
    .status(200)
    .json(new ApiResponse(200, Food, "Successfully fetch"))
})

const getFood = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const Food = await food.aggregate([
    {
      $match: { _id:  new ObjectId(id) }
    },
    {
      $lookup: {
        from: "menus",       
        localField: "menus",      
        foreignField: "_id",    
        as: "menuDetails"        
      }
    },
    {
      $lookup: {
        from: "tags", 
        localField: "tags",   
        foreignField: "_id",
        as: "tagDetails"   
      }
    },
    {
      $lookup: {
        from: "cuisines", 
        localField: "cuisines",   
        foreignField: "_id",
        as: "cuisineDetails"   
      }
    }
  ]);

  if (!Food || Food.length === 0) {
    throw new ApiError(400, "Food is not found!");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, Food[0], "Successfully found"));
})

const delFood = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const Food = await food.findByIdAndDelete({_id : id})

    return res
    .status(200)
    .json(new ApiResponse(200, "Food Delete Successfully"))
})

const updateFood = asyncHandler(async(req,res)=>{
    const ID = req.params.id
    const newFood = req.body

    const Food = await food.updateOne({_id : ID},{$set: {...newFood}})

    return res
    .status(200)
    .json(new ApiResponse(200, "Food Update Successfully"))
})

const getHotelFood = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const Food = await food.aggregate([
    {
      $match: { venues : { $in: [new ObjectId(id)] } }
    },
    {
      $lookup: {
        from: "menus",       
        localField: "menus",      
        foreignField: "_id",    
        as: "menuDetails"        
      }
    },
    {
      $lookup: {
        from: "tags", 
        localField: "tags",   
        foreignField: "_id",
        as: "tagDetails"   
      }
    }])
    
    if(!Food){
        throw new ApiError(400, "Food is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Food, "Successfully found"))
})

const popularFood = asyncHandler(async(req,res)=>{

    const Food = await food.find({}).sort({_id: 1}).limit(5);
    
    if(!Food){
        throw new ApiError(400, "Food is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Food, "Successfully found"))
})


const filterFood = asyncHandler(async (req, res) => {
  const { sortPrice, selectedMenu, selectedPriceRange, selectedTag } = req.body;
  const pageNo = req.params.pageNo;

  const tagObjectId = selectedTag.map((id) => new ObjectId(id));
  const menuObjectId = selectedMenu.map((id) => new ObjectId(id));

  const query = {};

  // Filter by Tag
  if (tagObjectId.length > 0) {
    query.tags = { $in: tagObjectId };
  }

  // Filter by Menu
  if (menuObjectId.length > 0) {
    query.menus = { $in: menuObjectId };
  }

  // Filter by price range
  if (selectedPriceRange) {
    if (selectedPriceRange === "under-50") {
      query.price = { $lt: 50 };
    } else if (selectedPriceRange === "50-100") {
      query.price = { $gte: 50, $lte: 100 };
    } else if (selectedPriceRange === "above-100") {
      query.price = { $gt: 100 };
    }
  }

  // Sort by Price
  const sortOptions = {};
  if (sortPrice) {
    if (sortPrice === "low-high") {
      sortOptions.price = 1;
    } else if (sortPrice === "high-low") {
      sortOptions.price = -1;
    }
  }

  // Execute the query
  const filteredData = await food.find(query).sort(sortOptions).skip((pageNo - 1)*15).limit(15).exec();

  if (!filteredData || filteredData.length === 0) {
    throw new ApiError(400, "No matching food items found!");
  }

  return res.status(200).json(new ApiResponse(200, filteredData, "Successfully found"));
});


export {
  addFood,
  allFood,
  getFood,
  getFoodByName,
  delFood,
  updateFood,
  getHotelFood,
  popularFood,
  filterFood
}