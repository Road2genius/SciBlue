import { User } from "../../../../shared-types/userData";
import { api } from "../api";

export const createUser = async (dataUser: User): Promise<User> => {
  return api.post<User, User>("/users", dataUser);
};

export const getUserById = async (userId: string): Promise<User> => {
  return api.get<User>(`/users/${userId}`);
};
