import { AuthResponse, LoginData } from "../../types/auth/auth";
import { api } from "../api";

export const login = async (data: LoginData): Promise<AuthResponse> => {
  return api.post<AuthResponse, LoginData>("/login", data);
};
