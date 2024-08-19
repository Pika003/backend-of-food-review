import { Router } from "express";
import {
    addCategory,
    allCategory,
    updateCategory
} from "../controllers/Category.controller.js"

const router = Router()

router.route("/add").post(addCategory)

router.route("/all").get(allCategory)

router.route("/update/:id").put(updateCategory)

export default router;