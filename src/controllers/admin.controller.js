import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {user} from "../models/user.model.js";
import {message} from "../models/message.model.js";
import {admin} from "../models/admin.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import nodemailer from "nodemailer";
// import { Sendmail } from "../utils/Nodemailer.js";


const generateAccessAndRefreshTokens = async (userID) =>{ 
    try {
        
        const User = await admin.findById(userID)
        
        const Accesstoken = User.generateAccessToken()
        const Refreshtoken = User.generateRefreshToken()

        User.Refreshtoken = Refreshtoken
        User.Accesstoken = Accesstoken
        await User.save({validateBeforeSave:false})

        return{Accesstoken, Refreshtoken}

    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const adminSignUp = asyncHandler(async(req,res)=>{
    const {username, password} = req.body

    if([username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedAdmin = await admin.findOne({username})

    if(existedAdmin){
        throw new ApiError(400, "admin already exist")
    }

    const newAdmin = await admin.create({
        username,
        password,
    })

    if(!newAdmin){
        throw new ApiError(400, "failed to add admin")
    }

    return res 
    .status(200)
    .json(new ApiResponse(400,{}, "admin added successfully"))

})

const adminLogin = asyncHandler(async(req,res)=>{

    const {username, password} = req.body

    if([username, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const loggedAdmin = await admin.findOne({username})

    if(!loggedAdmin){
        throw new ApiError(400, "admin does not exist")
    }

    const passwordCheck = await loggedAdmin.isPasswordCorrect(password)

    if(!passwordCheck){
        throw new ApiError(400, "Password is incorrect")
    }

    const temp_admin = loggedAdmin._id

    const {Accesstoken, Refreshtoken} =  await generateAccessAndRefreshTokens(temp_admin)

    const loggedadmin = await admin.findById(temp_admin).select("-password -Refreshtoken")

    const options = {
        httpOnly:true,
        secure:true,
    }

    return res 
    .status(200)
    .cookie("Accesstoken", Accesstoken, options)
    .cookie("Refreshtoken", Refreshtoken, options)
    .json(new ApiResponse(200,{admin:loggedadmin}, "logged in successfully"))
})

const adminLogout = asyncHandler(async(req,res)=>{

    await admin.findByIdAndUpdate(
        req.Admin._id,
        {
            $set:{
                Refreshtoken:undefined,
            }
        },
        {
            new:true
        }
    )
    const options ={
        httpOnly:true,
        secure:true,
    }

    return res
    .status(200)
    .clearCookie("Accesstoken", options)
    .clearCookie("Refreshtoken",  options)
    .json(new ApiResponse(200, {}, "admin logged out"))
})

const getMessage = asyncHandler(async(req,res)=>{

    const AllMsg = await message.find({})

    return res 
    .status(200)
    .json(new ApiResponse(200,{AllMsg}, "successfully message fetch"))
})

const addMessage = asyncHandler(async(req,res)=>{
    const {email, name} = req.body

    const ProfileImgPath = req.files?.profileImg?.[0]?.path
    
    if(!ProfileImgPath){
        throw new ApiError(400, "Profile image is required")
    }

    const profileImg = await uploadOnCloudinary(ProfileImgPath)

    const newMsg = await message.create({
        email,
        name,
        profileImg : profileImg.url
    })

    return res.status(200).json(
        new ApiResponse(200, newMsg, "Message added successfull")
    )
})


export{
    adminSignUp, 
    adminLogin, 
    adminLogout,
    addMessage, 
    getMessage 
}