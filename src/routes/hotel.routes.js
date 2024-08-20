import { Router } from "express";
import {
    addHotel,
    allHotel,
    getHotel,
    updateHotel,
    deleteHotel,
    popularHotel
} from "../controllers/hotel.controller.js";
import { authAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/add").post(addHotel)

router.route("/all").get(allHotel)

router.route("/popular").get(popularHotel);

router.route("/:id").get(getHotel)

router.route("/update/:id").put(updateHotel)

router.route("/delete/:id").delete(deleteHotel)

export default router;