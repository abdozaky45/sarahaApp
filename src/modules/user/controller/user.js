import userModel from "../../../../DB/Models/userModel.js";
import cloudinary from "../../../utils/cloud.js";
import { asynchandler } from "../../../utils/errorHandling.js";
//profile Pic"
export const profilePic = asynchandler(async (req, res, next) => {
  // save profile_pic in DataBase:

  // const user = await userModel.findByIdAndUpdate(
  //   req.user.id,
  //   { profile_pic: req.file.path },
  //   { new: true }
  // );
  //  ^^^^^^^^^^^^^^^^ multer file System ^^^^^^^^^^^^^^^^
  // Cloudnary
  // 1- upload file on cloudnary
  const { secure_url, public_id } = await cloudinary.uploader.upload(
    req.file.path,
    { folder: `users/${req.user.id}/profilePic` }
  );
  // 2- save url file in databas
  const user = await userModel.findByIdAndUpdate(
    req.user.id,
    { profile_pic: { secure_url, public_id } },
    { new: true }
  );
  return res.json({ success: true, results: user });
});

// cover Pic
export const coverPic = asynchandler(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  req.files.forEach((file) => {
    user.cover_pic.push(file.path);
  });
  const updateUser = await user.save();
  return res.json({ success: true, result: updateUser });
});
export const coverCloudnary = asynchandler(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);
  for (let index = 0; index < req.files.length; index++) {
    const file = req.files[index];
    const { secure_url, public_id } = await cloudinary.uploader.upload(
      file.path,
      { folder: `users/${req.user.id}/coverPic` }
    );
    user.cover_pic.push({
      secure_url,
      public_id,
    });
  }
  const updatedUser = await user.save();
  return res.json({ success: true, result: updatedUser });
});
export const updatePPic = asynchandler(async (req, res, next) => {
  // 1-update profilePic in cloudinary
  const user = await userModel.findById(id);
  const { secure_url } = await cloudinary.uploader.upload(req.file.path, {
    public_id: user.profile_pic.public_id,
  });
  // 2- update profilePic in DB
  user.profile_pic.secure_url = secure_url;
  const updatedUser = await user.save();
  return res.json({ success: true, result: updatedUser });
});
