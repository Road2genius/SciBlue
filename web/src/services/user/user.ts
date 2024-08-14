import { UserReq, UserRes } from "../../../../shared-types/userData";
import { api } from "../api";

export const createUser = async (dataUser: UserReq): Promise<UserRes> => {
  return api.post<UserRes, UserReq>("/users", dataUser);
};

export const getUserById = async (userId: string): Promise<UserRes> => {
  const response: { success: boolean; data: UserRes } = await api.get<{
    success: boolean;
    data: UserRes;
  }>(`/users/${userId}`);
  return response.data;
};

export const getUsersList = async (): Promise<UserRes[]> => {
  const response = await api.get<{
    success: boolean;
    data: UserRes[];
  }>(`/users/`);
  return response.data;
};
