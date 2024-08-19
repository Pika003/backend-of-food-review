import { Router } from "express";
import {
    addCategory,
    allCategory,
    updateCategory,
    getCategory
} from "../controllers/Category.controller.js"

const router = Router()

router.route("/add").post(addCategory)

router.route("/all").get(allCategory)

router.route("/:id").get(getCategory)

router.route("/update/:id").put(updateCategory)

export default router;