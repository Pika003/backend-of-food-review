import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {hotel} from "../models/hotel.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { MakeSlug } from "../utils/MakeSlug.js"

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

    const Hotel = await hotel.findOne({_id : id})

    if(!Hotel){
        throw new ApiError(400, "Hotel is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Hotel, "Successfully found"))
})

const updateHotel = asyncHandler(async(req,res)=>{
    const ID = req.params.id
    const newHotel = req.body

    const Hotel = await hotel.updateOne({_id : ID},{$set: {...newHotel}})

    return res
    .status(200)
    .json(new ApiResponse(200, Hotel, "Hotel Update Successfully"))
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

    const Hotel = await hotel.find( {$text: {$search: HotelName}} )

    return res
    .status(200)
    .json(new ApiResponse(200, Hotel, "Successfully fetch"))
})

export {
    addHotel,
    allHotel,
    getHotel,
    updateHotel,
    deleteHotel,
    popularHotel,
    getHotelByName
}