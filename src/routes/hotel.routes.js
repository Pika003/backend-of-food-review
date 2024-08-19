import { Router } from "express";
import {
    addHotel,
    allHotel,
    getHotel
} from "../controllers/hotel.controller.js";
import { authAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/add").post(addHotel)

router.route("/all").get(allHotel)

router.route("/:id").get(getHotel)

export default router;