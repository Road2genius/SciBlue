import express from "express";
import { createUser, deleteUser } from "../../controllers/user/userController";
import {
  checkUserExists,
  userValidationRules,
  validate,
} from "../../middleware/validateUser";

const router = express.Router();

// user
router.post(
  "/users",
  userValidationRules,
  validate,
  checkUserExists,
  createUser
);
router.delete("/users/:id", deleteUser);

export default router;
