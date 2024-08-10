import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {user} from "../models/user.model.js"
import jwt from "jsonwebtoken";

const authUser = asyncHandler(async(req,_,next) =>{

    const accToken = req.cookies?.Accesstoken

    if(!accToken) {
        throw new ApiError(401, "unauthorized req")
    }

    const decodedAccToken = jwt.verify(accToken,
        process.env.ACCESS_TOKEN_SECRET)

    const User = await user.findById(decodedAccToken?._id).select("-Password -Refreshtoken")

    if(!User){
        throw new ApiError(401, "invalid access token")
    }

    req.User = User
    next()
    
})

export { authUser }