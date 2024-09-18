import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {type} from "../models/type.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { MakeSlug } from "../utils/MakeSlug.js"

const addType = asyncHandler(async(req,res)=>{
    let typeData = req.body;
    let Slug = MakeSlug(typeData.name);

    typeData = {...typeData, slug: Slug};

    const newType = await type.create({ ...typeData})
    return res
    .status(200)
    .json(new ApiResponse(200, newType, "New Type Successfully added"))
})

const allType = asyncHandler(async(req,res)=>{
    const Type = await type.find({})

    if(!type){
        throw new ApiError(400, "Type is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Type, "Successfully fetch Type"))
})

const updateType = asyncHandler(async(req,res)=>{
    const ID = req.params.id
    const newType = req.body

    const Type = await type.updateOne({_id : ID},{$set: {...newType}})

    return res
    .status(200)
    .json(new ApiResponse(200, "Type Update Successfully"))
})

export {
    addType,
    allType,
    updateType
}