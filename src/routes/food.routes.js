import { Router } from "express";
import {
    addFood,
    allFood,
    getFood,
    getFoodByName,
    delFood,
    updateFood,
    getHotelFood,
    popularFood,
    filterFood
} from "../controllers/food.controller.js"

const router = Router()

router.route("/add").post(addFood)

router.route("/all").get(allFood)

router.route("/popular").get(popularFood);

router.route("/filter/:pageNo").post(filterFood);

router.route("/:id").get(getFood)

router.route("/hotel/:id").get(getHotelFood)

router.route("/search/:foodName").get(getFoodByName)

router.route("/update/:id").put(updateFood)

router.route("/delete/:id").delete(delFood)

export default router;