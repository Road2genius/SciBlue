import { connect } from "mongoose";

const connectDB = async () => {
  console.log(`⚡️[api]: mongo...`);
  return connect("mongodb://localhost:27017/SciWithMe")
    .then(() => {
      console.log(`⚡️[api]: mongo mongodb://localhost:27017/SciWithMe`);
    })
    .catch((err) => {
      console.error("⚠️[api]: mongo", err?.message);
    });
};

export default connectDB;
