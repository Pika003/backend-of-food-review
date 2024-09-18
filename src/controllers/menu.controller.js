import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {menu} from "../models/menu.model.js";
import {ApiResponse} from "../utils/ApiResponse.js";
import { MakeSlug } from "../utils/MakeSlug.js"

const addMenu = asyncHandler(async(req,res)=>{
    let menuData = req.body;
    let Slug = MakeSlug(menuData.name);

    menuData = {...menuData, slug: Slug};

    const newMenu = await menu.create({ ...menuData})
    return res
    .status(200)
    .json(new ApiResponse(200, newMenu, "New Menu Successfully added"))
})

const allMenu = asyncHandler(async(req,res)=>{
    const Menu = await menu.find({})

    if(!Menu){
        throw new ApiError(400, "Menu is not found !")
    }
    return res
    .status(200)
    .json(new ApiResponse(200, Menu, "Successfully fetch Menu"))
})

const updateMenu = asyncHandler(async(req,res)=>{
    const ID = req.params.id
    const newMenu = req.body

    const Menu = await menu.updateOne({_id : ID},{$set: {...newMenu}})

    return res
    .status(200)
    .json(new ApiResponse(200, "Menu Update Successfully"))
})

export {
    addMenu,
    allMenu,
    updateMenu
}