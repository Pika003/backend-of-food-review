import { Router } from "express";
import { 
    userSignUp, 
    userLogin, 
    userLogout, 
    getUser, 
  
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/userAuth.middleware.js";

const router = Router()

router.route("/signup").post(userSignUp)

router.route("/login").post(userLogin)

router.route("/logout").post(authUser, userLogout)

router.route("/profile/:id").get(authUser, getUser)

// router.route("/edit_profile").post(authUser, editeUser)

// router.route('/forgetpassword').post(forgetPassword)

// router.route('/forgetpassword/:token').post(resetPassword)

export default router;