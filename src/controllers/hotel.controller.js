import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {hotel} from "../models/hotel.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const addHotel = asyncHandler(async(req,res)=>{
    const newHotel = await hotel.create({ ...req.body})
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



export {
    addHotel,
    allHotel,
    getHotel,
    updateHotel,
    deleteHotel
}