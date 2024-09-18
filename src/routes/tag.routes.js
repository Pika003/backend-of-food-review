import { Router } from "express";
import { addTag, allTag, updateTag } from "../controllers/tag.controller.js";

const router = Router()

router.route("/add").post(addTag)

router.route("/all").get(allTag)

router.route("/update/:id").put(updateTag)

export default router;