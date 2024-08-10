import { Router } from "express";
import {
    addFood,
    allFood,
    getFood,
    getFoodByName,
    delFood
} from "../controllers/food.controller.js"

const router = Router()

router.route("/add").post(addFood)

router.route("/all").get(allFood)

router.route("/:id").get(getFood)

router.route("/search/:foodName").get(getFoodByName)

router.route("/:id").delete(delFood)

export default router;