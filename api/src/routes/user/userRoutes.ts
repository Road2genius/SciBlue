import express from "express";
import {
  createUser,
  deleteUser,
  updateUser,
} from "../../controllers/user/userController";
import {
  checkUserExists,
  createUserValidationRules,
  updateUserValidationRules,
  validate,
} from "../../middleware/validateUser";

const router = express.Router();

// user
router.post(
  "/users",
  createUserValidationRules,
  validate,
  checkUserExists,
  createUser
);
router.delete("/users/:id", deleteUser);
router.patch("/users/:id", updateUserValidationRules, validate, updateUser);

export default router;
