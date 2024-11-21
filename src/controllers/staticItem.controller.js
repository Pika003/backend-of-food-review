import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {staticItem} from "../models/staticItem.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { MakeSlug } from "../utils/MakeSlug.js"

const addStaticItem = asyncHandler(async(req,res)=>{
    let staticItemData = req.body;
    let Slug = MakeSlug(staticItemData.name);

    staticItemData = {...staticItemData, slug: Slug};

    const newstaticItem = await staticItem.create({ ...staticItemData})
    return res
    .status(200)
    .json(new ApiResponse(200, newstaticItem, "New staticItem Successfully added"))
})

const allStaticItem = asyncHandler(async(req,res)=>{
    const StaticItem = await staticItem.find({})

    if(!StaticItem){
        throw new ApiError(400, "staticItem is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, StaticItem, "Successfully fetch staticItems"))
})

const updateStaticItem = asyncHandler(async(req,res)=>{
    const ID = req.params.id
    const newstaticItem = req.body

    const StaticItem = await staticItem.updateOne({_id : ID},{$set: {...newstaticItem}})

    return res
    .status(200)
    .json(new ApiResponse(200, "staticItem Update Successfully"))
})

export {
    addStaticItem,
    allStaticItem,
    updateStaticItem
}