import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {hotel} from "../models/hotel.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { MakeSlug } from "../utils/MakeSlug.js"

import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const addHotel = asyncHandler(async(req,res)=>{
    let HotelData = req.body;
    let Slug = MakeSlug(HotelData.hotel_name);

    HotelData = {...HotelData, slug: Slug};


    const newHotel = await hotel.create({ ...HotelData})
    return res
    .status(200)
    .json(new ApiResponse(200, newHotel, "Hotel Successfully added"))
})

const allHotel = asyncHandler(async(req,res)=>{
    const Hotel = await hotel.find({})

    if(!Hotel){
        throw new ApiError(400, "Hotel is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Hotel, "Successfully fetch Hotel"))
})

const getHotel = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const Hotel = await hotel.aggregate([
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
            from: "types", 
            localField: "type",   
            foreignField: "_id",
            as: "typeDetails"   
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

    if(!Hotel){
        throw new ApiError(400, "Hotel is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Hotel[0], "Successfully found"))
})

const updateHotel = asyncHandler(async(req,res)=>{
    const ID = req.params.id
    const newHotel = req.body
    
    const updatedHotel = await hotel.updateOne({ _id: ID }, { $set: newHotel });

    if (!updatedHotel) {
      throw new ApiError(400, "Hotel not found!");
    }
  
    return res.status(200).json(
      new ApiResponse(200, updatedHotel, "Hotel updated successfully")
    );
})

const deleteHotel = asyncHandler(async(req,res)=>{
    const ID = req.params.id

    const Hotel = await hotel.deleteOne({_id: ID});

    return res
    .status(200)
    .json(new ApiResponse(200,"Hotel Delete Successfully"))
})

const popularHotel = asyncHandler(async(req,res)=>{

    const Hotel = await hotel.find({}).sort({rating:-1}).limit(3);
    
    if(!Hotel){
        throw new ApiError(400, "Food is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Hotel, "Successfully found"))
})

const getHotelByName = asyncHandler(async(req,res)=>{
    const HotelName = req.params.hotelName;

    const Hotel = await hotel.find( {$text: {$search: HotelName}} ).limit(15)

    return res
    .status(200)
    .json(new ApiResponse(200, Hotel, "Successfully fetch"))
})

const filterHotel = asyncHandler(async (req, res) => {
    const { selectedMenu, selectedPriceRange, selectedTypes, selectedCuisine } = req.body;
    const pageNo = req.params.pageNo;
  
    const typeObjectId = selectedTypes.map((id) => new ObjectId(id));
    const menuObjectId = selectedMenu.map((id) => new ObjectId(id));
    const CuisineObjectId = selectedCuisine.map((id) => new ObjectId(id));


    const query = {};
  
    // Filter by Cuisine
    if (CuisineObjectId.length > 0) {
      query.cuisines = { $in: CuisineObjectId };
    }

    // Filter by Types
    if (typeObjectId.length > 0) {
      query.type = { $in: typeObjectId };
    }
  
    // Filter by Menu
    if (menuObjectId.length > 0) {
      query.menus = { $in: menuObjectId };
    }

    // Filter by price range
    if (selectedPriceRange > 0) {
        query.price = {$in: selectedPriceRange}
    }
  
    // Execute the query
    const filteredData = await hotel.find(query).skip((pageNo - 1)*14).limit(14).exec();
  
    if (!filteredData || filteredData.length === 0) {
      throw new ApiError(400, "No matching hotel items found!");
    }
  
    return res.status(200).json(new ApiResponse(200, filteredData, "Successfully found"));
});

export {
    addHotel,
    allHotel,
    getHotel,
    updateHotel,
    deleteHotel,
    popularHotel,
    getHotelByName,
    filterHotel
}