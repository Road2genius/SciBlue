import { connect } from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI || "mongodb://localhost:27017/SciBlue";
  console.log(`⚡️[api]: Attempting to connect to MongoDB at ${mongoUri}`);
  return connect(mongoUri)
    .then(() => {
      console.log(`⚡️[api]: Connected to MongoDB at ${mongoUri}`);
    })
    .catch((err) => {
      console.error("⚠️[api]: mongo", err?.message);
    });
};

export default connectDB;
