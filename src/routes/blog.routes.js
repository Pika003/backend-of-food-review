import { Router } from "express";
import {
    addBlog,
    allBlog,
    getBlog,
    updateBlog,
    delBlog
} from "../controllers/blog.controller.js";

const router = Router()

router.route("/add").post(addBlog)

router.route("/all").get(allBlog)

router.route("/:id").get(getBlog)

router.route("/update/:id").put(updateBlog)

router.route("/delete/:id").delete(delBlog)

export default router;