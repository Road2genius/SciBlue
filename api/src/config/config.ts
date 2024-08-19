import dotenv from "dotenv";

const nodeEnv = process.env.NODE_ENV?.trim();
dotenv.config({ path: `.env.${nodeEnv}` });

export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
