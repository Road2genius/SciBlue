import { login, logout } from "../../services/auth/auth";
import { AuthResponse, LoginData } from "../../types/auth/auth";

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const { token, userId, avatar } = await login(data);
    sessionStorage.setItem("your_jwt_secret_key", token);

    return { token, userId, avatar };
  } catch (error) {
    throw new Error("Failed to log in");
  }
};

export const logoutUser = async (userId: string): Promise<void> => {
  try {
    await logout(userId);
    sessionStorage.removeItem("your_jwt_secret_key");
  } catch (error) {
    throw new Error("Failed to log in");
  }
};
