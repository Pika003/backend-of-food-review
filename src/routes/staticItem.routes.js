import { Router } from "express";
import { addStaticItem, allStaticItem, updateStaticItem, getStaticItem } from "../controllers/staticItem.controller.js";

const router = Router()

router.route("/add").post(addStaticItem)

router.route("/all").get(allStaticItem)

router.route("/:id").get(getStaticItem)

router.route("/update/:id").put(updateStaticItem)

export default router;