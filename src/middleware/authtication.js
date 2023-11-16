import jwk from "jsonwebtoken";
import { asynchandler } from "../utils/errorHandling.js";
import userModel from "../../DB/Models/userModel.js";
export const auth = asynchandler(async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization.startsWith(process.env.BEARER_TOKEN)) {
    return next(
      new Error("authorization is required or in-valid Bearer Key", {
        cause: 400,
      })
    );
  }
  const token = authorization.split(process.env.BEARER_TOKEN)[1];
  if (!token) {
    return next(new Error("token is required ", { cause: 400 }));
  }
  const decoded = jwk.verify(token, process.env.TOKEN_SIGNATURE);
  if (!decoded?.id) {
    return next(new Error("in-valid token payload", { cause: 400 }));
  }
  const user = await userModel.findById(decoded.id); //{} , null
  if (!user) {
    return next(new Error("Not register account", { cause: 401 }));
  }
  req.user = user;
  return next();
});