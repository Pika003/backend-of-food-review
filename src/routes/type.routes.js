import { Router } from "express";
import { 
    addType,
    allType,
    updateType } from "../controllers/type.controller.js";

const router = Router()

router.route("/add").post(addType)

router.route("/all").get(allType)

router.route("/update/:id").put(updateType)

export default router;