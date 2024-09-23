import { Router } from "express";
import {
    addHotel,
    allHotel,
    getHotel,
    updateHotel,
    deleteHotel,
    popularHotel,
    getHotelByName,
    filterHotel
} from "../controllers/hotel.controller.js";

const router = Router()

router.route("/add").post(addHotel)

router.route("/all").get(allHotel)

router.route("/popular").get(popularHotel);

router.route("/filter/:pageNo").post(filterHotel);

router.route("/:id").get(getHotel)

router.route("/search/:hotelName").get(getHotelByName)

router.route("/update/:id").put(updateHotel)

router.route("/delete/:id").delete(deleteHotel)

export default router;