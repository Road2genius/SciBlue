import { UserReq, UserRes } from "../../../../shared-types/userData";
import {
  createUser,
  getUserById,
  getUsersList,
} from "../../services/user/user";
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
