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

router.route("/message/all").post(getMessage)

router.route("/message/add").post(upload.fields([{
    name : "profileImg"
}]), addMessage)


export default router;