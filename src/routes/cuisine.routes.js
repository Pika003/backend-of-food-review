import { Router } from "express";
import { addCuisine, allCuisine, updateCuisine } from "../controllers/cuisine.controller.js";

const router = Router()

router.route("/add").post(addCuisine)

router.route("/all").get(allCuisine)

router.route("/update/:id").put(updateCuisine)

export default router;