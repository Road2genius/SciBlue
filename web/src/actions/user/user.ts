import { UserReq, UserRes } from "../../../../shared-types/userData";
import { ERROR_CODES, ERROR_MESSAGES } from "../../constants/error/errorCodes";
import { refreshTokenService } from "../../services/auth/auth";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsersList,
  updateUser,
} from "../../services/user/user";
import { CustomError } from "../../types/error/customError";
import { getErrorMessage } from "../../utils/handleError";

export const createUserAction = async (dataUser: UserReq): Promise<UserRes> => {
  try {
    const user: UserRes = await createUser(dataUser);
    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getUserByIdAction = async (userId: string): Promise<UserRes> => {
  try {
    const user: UserRes = await getUserById(userId);
    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getUsersListAction = async (): Promise<UserRes[]> => {
  try {
    const users: UserRes[] = await getUsersList();
    return users;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const updateUserAction = async (
  userId: string,
  dataUser: UserRes
): Promise<UserRes> => {
  try {
    const user: UserRes = await updateUser(userId, dataUser);
    return user;
  } catch (error) {
    const err: CustomError = error as CustomError;
    if (err.message === ERROR_MESSAGES[ERROR_CODES.UNAUTHORIZED]) {
      await refreshTokenService();
      return await updateUserAction(userId, dataUser);
    } else {
      throw new Error(getErrorMessage(error));
    }
  }
};

export const deleteUserAction = async (userId: string): Promise<void> => {
  try {
    await deleteUser(userId);
    sessionStorage.removeItem("auth_token");
    localStorage.removeItem("userContext");
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
