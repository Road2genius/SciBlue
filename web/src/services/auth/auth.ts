import { api } from "../api";

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  userId: string;
  avatar: string;
}

export const login = async (data: LoginData): Promise<AuthResponse> => {
  return api.post<AuthResponse, LoginData>("/login", data);
};
