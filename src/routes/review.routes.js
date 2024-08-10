import { Router } from "express";
import { addReview } from "../controllers/review.controller.js";
import { authUser } from "../middlewares/userAuth.middleware.js";

const router = Router()

router.route("/add").post(authUser, addReview)

export default router;