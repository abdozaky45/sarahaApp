import mongoose from "mongoose";
const connectDB = async () => {
  return await mongoose
  .connect(process.env.DB_URL)
    .then((result) => {
      console.log("connect DB--------------------------------->");
    })
    .catch((err) => {
      console.log(`error connect DB------>${err}`);
    });
};
export default connectDB;
