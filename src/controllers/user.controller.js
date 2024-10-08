import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {user} from "../models/user.model.js";
import {food} from "../models/food.model.js";
import {hotel} from "../models/hotel.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import  {oauth2client}  from "../utils/googleConfig.js";
import axios from 'axios';

// import nodemailer from "nodemailer";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
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

    const existedUser = await user.findOne({ Email: req.body.Email });
    if(existedUser){
        throw new ApiError(400, "User already exist")
    }

    // const ProfileImgPath = req.files?.profile_img_url?.[0]?.path
    
    // if(!ProfileImgPath){
    //     throw new ApiError(400, "Profile image is required")
    // }

    // const profileImg = await uploadOnCloudinary(ProfileImgPath)

    const newUser = await user.create({
        Email,
        Password
        // profile_img_url : profileImg.url
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

    const options = { //hide kore try kor
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

const googleLogin = asyncHandler(async(req,res)=> {
    try {
        const code = req.body.code;

        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        const {id, email, name, picture} = userRes.data;

        let User = await user.findOne({Email: email});

        if(!User){
            User = await user.create({
                Email: email,
                Password: id,
                user_name: name,
                profile_img_url: picture,

            })
        }

        const tempUser = User._id;

        const {Accesstoken, Refreshtoken} =  await generateAccessAndRefreshTokens(tempUser)

        const loggedInUser = await user.findById(tempUser).select("-Password -Refreshtoken")

        const options = { //hide kore try kor
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

    } catch (error) {
        console.log("ser Err: ",error)
        return res
        .status(500)
        .json(
            new ApiResponse(
                500, "Internal Server Err"
            )
        )
    }
})

const userLogout = asyncHandler(async(req,res)=>{
    await user.findByIdAndUpdate(
        req.params.ID,
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
    const NewUSER = await user.findOne({_id : id})

    return res
    .status(200)
    .json(new ApiResponse(200, NewUSER, "User Found"))
})

const editUser = asyncHandler(async (req, res) => {
    const ID = req.params.id;
    let newUser = req.body;
    
    const userImagePath = req.files?.profile_img_url?.[0]?.path;

    if (userImagePath) {
        const userImage = await uploadOnCloudinary(userImagePath);
        newUser = { ...newUser, profile_img_url: userImage.url };
    }

    await user.updateOne({ _id: ID }, { $set: { ...newUser } });

    const updatedUser = await user.findById(ID);
    return res.status(200).json(new ApiResponse(200, updatedUser, "User Updated Successfully"));
});

const getCookies = asyncHandler(async(req, res)=>{
    const accToken = req.cookies?.Accesstoken

    if(!accToken) {
        throw new ApiError(401, "cookies not found")
    }

    const decodedAccToken = jwt.verify(accToken,
        process.env.ACCESS_TOKEN_SECRET)

    const User = await user.findById(decodedAccToken?._id).select("-Password -Refreshtoken")

    if(!User){
        throw new ApiError(401, "cookies not found")
    }

    return res
    .status(200)
    .json(new ApiResponse(200, user, "User is logged in"))
})

const SearchData = asyncHandler(async(req, res)=>{
    const SearchItem = req.params.searchItem;

    const Food = await food.find( {$text: {$search: SearchItem}} );

    const Hotel = await hotel.find( {$text: {$search: SearchItem}} );

    if(Food.length === 0){
        if(Hotel.length === 0){
            return res
            .status(200)
            .json(new ApiResponse(200, "Noting Found"))
        }else{
            return res
            .status(200)
            .json(new ApiResponse(200, "Hotel"))
        }
        
    }else{
        return res
        .status(200)
        .json(new ApiResponse(200, "Food"))
    }
})

const getAllUser = asyncHandler(async(req, res)=>{
    const AllUser = await user.find({});

    return res
    .status(200)
    .json(new ApiResponse(200, AllUser, "user fetch successfully"))
})


export{
    userSignUp,
    userLogin,
    userLogout,
    getUser,
    getCookies,
    SearchData,
    getAllUser,
    editUser,
    googleLogin
}
