import { Router } from "express";
import {
    addBlog,
    allBlog,
    getBlog
} from "../controllers/blog.controller.js";
import { authUser } from "../middlewares/userAuth.middleware.js";

const router = Router()

router.route("/add").post(authUser, addBlog)

router.route("/all").get(authUser, allBlog)

router.route("/:id").get(authUser, getBlog)

export default router;