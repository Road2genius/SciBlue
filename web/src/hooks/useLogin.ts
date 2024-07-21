import { useState } from "react";
import { loginUser } from "../actions/auth/auth";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  interface AuthResponse {
    token: string;
    userId: string;
    avatar: string;
  }

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginUser({ email, password });
      return user;
    } catch (err) {
      setError("Login failed");
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
