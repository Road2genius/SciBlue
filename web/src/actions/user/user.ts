import { User } from "../../../../shared-types/userData";
import { createUser } from "../../services/user/user";
import { getErrorMessage } from "../../utils/handleError";

export const createUserAction = async (dataUser: User): Promise<User> => {
  try {
    const user: User = await createUser(dataUser);
    return user;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
};
