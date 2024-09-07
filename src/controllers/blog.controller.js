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

const updateBlog = asyncHandler(async(req,res)=>{
    const ID = req.params.id
    const newBlog = req.body

    const Blog = await blog.updateOne({_id : ID},{$set: {...newBlog}})

    return res
    .status(200)
    .json(new ApiResponse(200, "Blog Update Successfully"))
})

const delBlog = asyncHandler(async(req,res)=>{
    const id = req.params.id

    const Blog = await blog.findByIdAndDelete({_id : id})

    return res
    .status(200)
    .json(new ApiResponse(200, "Blog Delete Successfully"))
})

export {
    addBlog,
    allBlog,
    getBlog,
    updateBlog,
    delBlog
}