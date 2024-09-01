import {
  login,
  logout,
  requestResetPassword,
  resetPassword,
} from "../../services/auth/auth";
import { AuthResponse, LoginData } from "../../types/auth/auth";
import {
  handleError,
} from "../../utils/handleError";

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const { token, userId, avatar } = await login(data);
    sessionStorage.setItem("auth_token", token);

    return { token, userId, avatar };
  } catch (error) {
    throw new Error("Failed to log in");
  }
};

export const logoutUser = async (userId: string): Promise<void> => {
  try {
    await logout(userId);
    sessionStorage.removeItem("auth_token");
    localStorage.removeItem("userContext");
  } catch (error) {
    throw new Error("Failed to log in");
  }
};

export const requestResetPasswordAction = async (
  email: string
): Promise<void> => {
  try {
    await requestResetPassword(email);
  } catch (error) {
    throw new Error(handleError(error));
  }
};

export const resetPasswordAction = async (
  token: string,
  password: string
): Promise<void> => {
  try {
    await resetPassword(token, password);
  } catch (error) {
    throw new Error(handleError(error));
  }
};
