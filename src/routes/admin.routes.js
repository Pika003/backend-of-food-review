import { Router } from "express";
import { 
    adminSignUp, 
    adminLogin, 
    adminLogout,
    addMessage,
    getMessage
} from "../controllers/admin.controller.js";
import { authAdmin } from "../middlewares/adminAuth.middleware.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()

router.route("/signup").post(adminSignUp)

router.route("/login").post(adminLogin)

router.route("/logout").post(authAdmin, adminLogout)

router.route("/message/all").get(getMessage)

router.route("/message/add").post(addMessage)


export default router;