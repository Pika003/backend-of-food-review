import { Router } from "express";
import {
    addBlog,
    allBlog,
    getBlog
} from "../controllers/blog.controller.js";

const router = Router()

router.route("/add").post(addBlog)

router.route("/all").get(allBlog)

router.route("/:id").get(getBlog)

export default router;