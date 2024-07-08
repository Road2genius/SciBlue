import express from "express";

import { loginUser } from "../../controllers/auth/authController";

const authRoutes = express.Router();

// auth
authRoutes.post("/login", loginUser);

export default authRoutes;
