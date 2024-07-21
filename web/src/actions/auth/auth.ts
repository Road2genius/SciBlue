import { login } from "../../services/auth/auth";

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  userId: string;
  avatar: string;
}

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const { token, userId, avatar } = await login(data);
    localStorage.setItem("token", token);
    return { token, userId, avatar };
  } catch (error) {
    throw new Error("Failed to log in");
  }
};
