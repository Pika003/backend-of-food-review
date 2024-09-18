import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {tag} from "../models/tag.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { MakeSlug } from "../utils/MakeSlug.js"

const addTag = asyncHandler(async(req,res)=>{
    let tagData = req.body;
    let Slug = MakeSlug(tagData.name);

    tagData = {...tagData, slug: Slug};

    const newTag = await tag.create({ ...tagData})
    return res
    .status(200)
    .json(new ApiResponse(200, newTag, "New Tag Successfully added"))
})

const allTag = asyncHandler(async(req,res)=>{
    const Tag = await tag.find({})

    if(!Tag){
        throw new ApiError(400, "Tag is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Tag, "Successfully fetch Tags"))
})

const updateTag = asyncHandler(async(req,res)=>{
    const ID = req.params.id
    const newTag = req.body

    const Tag = await tag.updateOne({_id : ID},{$set: {...newTag}})

    return res
    .status(200)
    .json(new ApiResponse(200, "Tag Update Successfully"))
})

export {
    addTag,
    allTag,
    updateTag
}