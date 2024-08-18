import { connect } from "mongoose";

const connectDB = async () => {
  console.log(`⚡️[api]: mongo...`);
  return connect(process.env.MONGO_URI || "mongodb://localhost:27017/SciBlue")
    .then(() => {
      console.log(`⚡️[api]: mongo mongodb://localhost:27017/SciBlue`);
    })
    .catch((err) => {
      console.error("⚠️[api]: mongo", err?.message);
    });
};

export default connectDB;
