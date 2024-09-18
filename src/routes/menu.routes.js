import { Router } from "express";
import { 
    addMenu,
    allMenu,
    updateMenu
} from "../controllers/menu.controller.js";

const router = Router()

router.route("/add").post(addMenu)

router.route("/all").get(allMenu)

router.route("/update/:id").put(updateMenu)

export default router;