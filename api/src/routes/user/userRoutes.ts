import express from "express";
import { activateAccount, createUser, deleteUser, getUserById, getUsersList, updateUser } from "../../controllers/user/userController";
import {
  checkUserExists,
  createUserValidationRules,
  updateUserValidationRules,
  mappingErrors,
} from "../../middleware/validateUser";
import { authenticateJWT } from "../../middleware/auth";
import { ENDPOINT } from "../http";

const userRouter = express.Router();

// user
userRouter.post(
  ENDPOINT.USER.CREATE_USER_PATH,
  createUserValidationRules(),
  mappingErrors,
  checkUserExists,
  createUser
);
userRouter.get(ENDPOINT.USER.GET_USER_BY_ID_PATH, getUserById);
userRouter.delete(ENDPOINT.USER.DELETE_USER_PATH, authenticateJWT, deleteUser);
userRouter.patch(
  ENDPOINT.USER.UPDATE_USER_PATH,
  authenticateJWT,
  updateUserValidationRules(),
  mappingErrors,
  updateUser
);
userRouter.get(ENDPOINT.USER.GET_USERS_LIST_PATH, getUsersList);
userRouter.get(ENDPOINT.USER.ACTIVATE_ACCOUNT_EMAIL, activateAccount)

export default userRouter;
