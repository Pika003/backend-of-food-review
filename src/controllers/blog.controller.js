import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {blog} from "../models/blog.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";



const addBlog = asyncHandler(async(req,res)=>{
    const newBlog = await blog.create({ ...req.body})
    return res
    .status(200)
    .json(new ApiResponse(200, newBlog, "Blog added Successfully"))
})

const allBlog = asyncHandler(async(req,res)=>{
    const Blog = await blog.find({})

    if(!Blog){
        throw new ApiError(400, "Blog is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Blog, "Successfully fetch blog"))
})

const getBlog = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const Blog = await blog.findOne({_id : id})

    if(!Blog){
        throw new ApiError(400, "Blog is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Blog, "Successfully found blog"))
})

export {
    addBlog,
    allBlog,
    getBlog
}