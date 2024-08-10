import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {user} from "../models/user.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
// import nodemailer from "nodemailer";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { Sendmail } from "../utils/Nodemailer.js";


const generateAccessAndRefreshTokens = async (userID) =>{ 
    try {
        
        const User = await user.findById(userID)
        
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

const userSignUp = asyncHandler(async (req, res) =>{
    
    const{Email, Password} = req.body;
    
    if(
        [Email, Password].some((field)=> 
        field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await user.findOne({ email: req.body.Email });
    if(existedUser){
        throw new ApiError(400, "User already exist")
    }
    
    const newUser = await user.create({
        Email,
        Password
    })

    const createdUser = await user.findById(newUser._id).select(
        "-Password "
    ) 
    
    if(!createdUser){
        throw new ApiError(501, "User registration failed")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "Signup successfull")
    )

})

const userLogin = asyncHandler(async(req,res) => {

    const{Email, Password} = req.body;

    if([Email, Password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const UserLogin = await user.findOne({
        Email
    })

    if(!UserLogin){
        throw new ApiError(400, "User does not exist")
    }
    
    const UserPassCheck = await UserLogin.isPasswordCorrect(Password)

    if(!UserPassCheck){
        throw new ApiError(403,"Password is incorrect",)
    }

    const tempUser = UserLogin._id

    
    const {Accesstoken, Refreshtoken} =  await generateAccessAndRefreshTokens(tempUser)

    const loggedInUser = await user.findById(tempUser).select("-Password -Refreshtoken")

    const options = {
        httpOnly:true,
        secure:true,
    }

    return res
    .status(200)
    .cookie("Accesstoken", Accesstoken, options)
    .cookie("Refreshtoken", Refreshtoken, options)
    .json(
        new ApiResponse(
            200,{
            user:loggedInUser
            }, "logged in"
        )
    )

})

const userLogout = asyncHandler(async(req,res)=>{
    await user.findByIdAndUpdate(
        req.user._id,
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
    .json(new ApiResponse(200, {}, "User logged out"))
})

const getUser = asyncHandler(async(req,res)=>{
    const id = req.params.id

    if(req.user._id != id){
        throw new ApiError(400, "unauthroized access")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, user, "User is logged in"))
})

// const editeUser = asyncHandler(async(req,res)=>{
//     const user = req.user
//     const id = req.params.id
//     if(req.user._id != id){
//         throw new ApiError(400, "unauthroized access")
//     }
//     return res
//     .status(200)
//     .json(new ApiResponse(200, user, "User is logged in"))
// })


export{
    userSignUp,
    userLogin,
    userLogout,
    getUser,
}