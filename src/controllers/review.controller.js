import {asyncHandler} from "../utils/asyncHandler.js";
// import {ApiError} from "../utils/ApiError.js";
import {review} from "../models/review.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";


const addReview = asyncHandler(async(req,res)=>{
    const newReview = await review.create({ ...req.body})
    return res
    .status(200)
    .json(new ApiResponse(200, newReview, "Review Successfully added"))
})

export {
    addReview
}
