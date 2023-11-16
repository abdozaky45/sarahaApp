import { Router } from "express";
import * as messageController from "../message/controller/message.js"
import { validation } from "../../middleware/validation.js";
import * as validate from "../message/validation.js"
import { auth } from "../../middleware/authtication.js";
const router =Router();
router.post("/addMessage",auth,validation(validate.addMessage),messageController.addMessage);
router.get("/getMessage",auth,messageController.getAllMessage);
router.get("/getMessageUser/:sendTo",auth,messageController.getAllMessageUser);
router.post("/deleteMessage",auth,messageController.deleteMessage);
export default router;