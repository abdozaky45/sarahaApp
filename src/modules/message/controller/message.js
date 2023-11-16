import { messageModel } from "../../../../DB/Models/messageModel.js";
import userModel from "../../../../DB/Models/userModel.js";
import { asynchandler } from "../../../utils/errorHandling.js";

export const addMessage = asynchandler(async (req, res, next) => {
  const { content, sendTo } = req.body;
  const isUserExist = await userModel.findById(sendTo);
  if (!isUserExist) {
    return next(new Error("in-valid -> id", { cause: 400 }));
  }
  const message = await messageModel.create({ content, sendTo });
  return res.status(200).json({ Message: "Do1 inserted", message });
});
export const getAllMessage = asynchandler(async (req, res, next) => {
  const getAll = await messageModel.find({});
  return res.json({ Message: "find({})", getAll });
});
export const getAllMessageUser = asynchandler(async (req, res, next) => {
  const { sendTo } = req.params;
  const getAllMessage = await messageModel.find({ sendTo });
  return res.json({ Message: "find({})", getAllMessage });
});
export const deleteMessage = asynchandler(async (req, res, next) => {
  const { id, sendTo } = req.body;
  const message = await messageModel.findOneAndDelete({
    _id:id,
    sendTo,
  });
  if(!message){
    return next(new Error("in-valid id message or id user"))
  }
return res.json({Message:"Do1 Deleted",message});
});
