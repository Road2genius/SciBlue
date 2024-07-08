import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../../controllers/user/userController";
import {
  checkUserExists,
  createUserValidationRules,
  updateUserValidationRules,
  validate,
} from "../../middleware/validateUser";
import { authenticateJWT } from "../../middleware/auth";

const userRouter = express.Router();

// user
userRouter.post(
  "/users",
  createUserValidationRules(),
  validate,
  checkUserExists,
  createUser
);
userRouter.get("/users/:id", authenticateJWT, getUserById);
userRouter.delete("/users/:id", authenticateJWT, deleteUser);
userRouter.patch(
  "/users/:id",
  authenticateJWT,
  updateUserValidationRules(),
  validate,
  updateUser
);

export default userRouter;
