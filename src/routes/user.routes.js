import { Router } from "express";
import { 
    userSignUp, 
    userLogin, 
    userLogout, 
    getUser,
    getCookies,
    SearchData,
    getAllUser
  
} from "../controllers/user.controller.js";
import { authUser } from "../middlewares/userAuth.middleware.js";
// import { authSchema } from "../middlewares/joiLogin.middleware.js";
// import { upload } from '../middlewares/multer.middleware.js'

const router = Router()

// router.route("/signup").post(upload.fields(
//     [{name : "profile_img_url"}]
// ),userSignUp)

router.route("/signup").post(userSignUp)

router.route("/login").post(userLogin)

router.route("/logout").post(authUser, userLogout)

router.route("/profile/:id").get(authUser, getUser)

router.route("/cookies").get(getCookies)

router.route("/searchItem/:searchItem").get(SearchData)

router.route("/all").get(getAllUser)

// router.route("/edit_profile").post(authUser, editeUser)

// router.route('/forgetpassword').post(forgetPassword)

// router.route('/forgetpassword/:token').post(resetPassword)

export default router;