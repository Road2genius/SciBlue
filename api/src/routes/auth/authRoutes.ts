import express from "express";
import { loginUser, requestPasswordReset, resetPassword } from "../../controllers/auth/authController";
import { ENDPOINT } from "../http";

const authRoutes = express.Router();

// auth
authRoutes.post(ENDPOINT.AUTH.LOGIN_PATH, loginUser);
authRoutes.post(ENDPOINT.AUTH.REQUEST_PASSWORD_RESET_PATH, requestPasswordReset);
authRoutes.post(ENDPOINT.AUTH.RESET_PASSWORD_PATH, resetPassword);

export default authRoutes;
