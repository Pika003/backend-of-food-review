import { Router } from "express";
import { 
    adminSignUp, 
    adminLogin, 
    adminLogout, 
} from "../controllers/admin.controller.js";
import { authAdmin } from "../middlewares/adminAuth.middleware.js";

const router = Router()

router.route("/signup").post(adminSignUp)

router.route("/login").post(adminLogin)

router.route("/logout").post(authAdmin, adminLogout)

// router.route("/contact-us").get(authAdmin, )


export default router;