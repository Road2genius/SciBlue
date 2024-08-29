import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "./config";

// Function to generate an activation token
export const generateActivationToken = (userId: string): string => {
  if (!JWT_SECRET_KEY) {
    throw new Error("TOKEN is not defined.");
  }

  return jwt.sign({ userId }, JWT_SECRET_KEY, { expiresIn: "1h" });
};
