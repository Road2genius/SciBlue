import { AuthResponse, LoginData } from "../../types/auth/auth";
import { handleError } from "../../utils/handleError";
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

  sessionStorage.setItem("auth_token", response.token);

  return response.token;
};

export const requestResetPassword = async (email: string): Promise<void> => {
  return api.post<void, { email: string }>("/request-password-reset", {
    email,
  });
};

export const resetPassword = async (
  token: string,
  password: string
): Promise<void> => {
  try {
    await api.post<{ password: string }, object>(
      `/reset-password/${token}`,
      { password },
      {
        "Content-Type": "application/json",
      }
    );
  } catch (error) {
    throw new Error(handleError(error));
  }
};
