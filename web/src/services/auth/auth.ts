import { AuthResponse, LoginData } from "../../types/auth/auth";
import { api } from "../api";

export const login = async (data: LoginData): Promise<AuthResponse> => {
  return api.post<AuthResponse, LoginData>("/login", data);
};

export const logout = async (userId: string): Promise<AuthResponse> => {
  return api.get<AuthResponse>(`/logout/${userId}`);
};

export const refreshTokenService = async (): Promise<string> => {
  const response = await api.post<{ token: string }, object>(
    "/refresh-token",
    {},
    {
      credentials: "include",
      "Content-Type": "application/json",
    }
  );

  sessionStorage.setItem("your_jwt_secret_key", response.token);

  return response.token;
};
