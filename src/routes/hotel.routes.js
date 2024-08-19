import { Router } from "express";
import {
    addHotel,
    allHotel,
    getHotel,
    updateHotel
} from "../controllers/hotel.controller.js";
import { authAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/add").post(addHotel)

router.route("/all").get(allHotel)

router.route("/:id").get(getHotel)

router.route("/update/:id").put(updateHotel)

export default router;