
import connectDB from "../DB/connection.js";
import authRouter from "./modules/auth/auth.router.js";
import { globalErrorHandling } from "./utils/errorHandling.js";
import messageRouter from "./modules/message/message.router.js";
import userRouter from "./modules/user/user.router.js";


const bootstrap = (app, express) => {
  //middleware for static  files
  app.use("/uploads",express.static("uploads"));
 // Routers Buffar Data
  app.use(express.json());
  // auth
  app.use("/auth", authRouter);
  //user
  app.use("/user",userRouter)
  //message
  app.use("/message",messageRouter);
  // all
  app.use("*",(req,res,next)=>{
    return res.json({ Message: "in-valid-Routing" });
  });
  app.use(globalErrorHandling);
  connectDB(); //connection Mongo DB
};

export default bootstrap;
