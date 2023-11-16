import { Router } from "express";
import * as authController from "./controller/auth.js";
import { auth } from "../../middleware/authtication.js";
import { validation } from "../../middleware/validation.js";
import * as validtors from "../auth/validation.js"
const router = Router();
router.post("/signup",validation(validtors.signup),authController.signup);
router.get("/confirmEmail/:token", authController.confirmEmail);
router.get("/newconfirmEmail/:token", authController.newConfirmEmail);
router.post("/login",validation(validtors.login) ,authController.login);
router.post("/change",validation(validtors.changePassword),auth,authController.changePassword);
export default router;
