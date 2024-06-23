import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  typeOfStructure:
    | "academic laboratory"
    | "academic technology platform"
    | "cro and private technology platform"
    | "corporation"
    | "others";
  laboratory: string;
  institution: string;
  address: string;
  city: string;
  country: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    typeOfStructure: {
      type: String,
      required: true,
      enum: [
        "academic laboratory",
        "academic technology platform",
        "cro and private technology platform",
        "corporation",
        "others",
      ],
    },
    laboratory: { type: String, required: true },
    institution: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
