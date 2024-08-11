import { User } from "../../../../shared-types/userData";
import { api } from "../api";

export const createUser = async (dataUser: User): Promise<User> => {
  return api.post<User, User>("/users", dataUser);
};

export const getUserById = async (userId: string): Promise<User> => {
  const response: { success: boolean; data: User } = await api.get<{
    success: boolean;
    data: User;
  }>(`/users/${userId}`);
  return response.data;
};

export const getUsersList = async (): Promise<User[]> => {
  return api.get<User[]>(`/users/`);
};
