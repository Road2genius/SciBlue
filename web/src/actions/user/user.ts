import { User } from "../../../../shared-types/userData";
import {
  createUser,
  getUserById,
  getUsersList,
} from "../../services/user/user";
import { getErrorMessage } from "../../utils/handleError";

export const createUserAction = async (dataUser: User): Promise<User> => {
  try {
    const user: User = await createUser(dataUser);
    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getUserByIdAction = async (userId: string): Promise<User> => {
  try {
    const user: User = await getUserById(userId);
    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};

export const getUsersListAction = async (): Promise<User[]> => {
  try {
    const users: User[] = await getUsersList();
    return users;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
