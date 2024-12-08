import { Router } from "express";
import { 
    allFavFoodList, 
    addFavFoodList, 
    getFavFoodList, 
    updateFavFoodList,
    updateFoodFavFoodList,
    delFavList 
} from "../controllers/favFood.controller.js";

const router = Router()

router.route("/all/:id").get(allFavFoodList)

router.route("/add").post(addFavFoodList)

router.route("/:id").get(getFavFoodList)

router.route("/update/:id").put(updateFavFoodList)

router.route("/updateFood/:id").put(updateFoodFavFoodList)

router.route("/delete/:id").delete(delFavList)

export default router;