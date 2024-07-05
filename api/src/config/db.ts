import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/SciWithMe";
    await mongoose.connect(mongoURI);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
