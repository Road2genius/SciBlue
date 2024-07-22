import { login } from "../../services/auth/auth";
import { AuthResponse, LoginData } from "../../types/auth/auth";

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const { token, userId, avatar } = await login(data);
    localStorage.setItem("token", token);
    return { token, userId, avatar };
  } catch (error) {
    throw new Error("Failed to log in");
  }
};
