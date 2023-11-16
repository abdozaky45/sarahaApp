import { Router } from "express";
import { auth } from "../../middleware/authtication.js";
import * as userController from "./controller/user.js";
import { uploadCloud } from "../../utils/multerCloud.js";
import { fileValidation, uploads } from "../../utils/multer.js";
const router = Router();
// multer save >> file System <<
// router.post(
//   "/profilePic",
//   auth,
//   uploads({
//     folder: "users/profilePic",
//     filetype: fileValidation.image,
//   }).single("profilePic"),
//   userController.profilePic
// );
router.post(
  "/coverPic",
  auth,
  uploads({
    folder: "/users/coverPic",
    filetype: fileValidation.image,
  }).array("cover", 5),
  userController.coverPic
);
router.post(
  "/cover",
  auth,
  uploadCloud().array("x"),
  userController.coverCloudnary
);
///////////////////////////////////////////////////////////////////////////////
// save file >> cloud <<
router.post(
  "/profilePic",
  auth,
  uploadCloud().single("profilePic"),
  userController.profilePic
);
router.patch(
  "/updateProfilePic",
  auth,
  uploadCloud().single("pp"),
  userController.updatePPic
);
export default router;
