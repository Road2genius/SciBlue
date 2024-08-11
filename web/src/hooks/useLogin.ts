import { useState } from "react";
import { loginUser } from "../actions/auth/auth";
import { AuthResponse } from "../types/auth/auth";
import { useSnackbar } from "notistack";
import { useUserContext } from "../context/UserContext";

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [error, setError] = useState<string | null>(null);
  const { setUserContext } = useUserContext();

  const login = async (
    email: string,
    password: string
  ): Promise<AuthResponse | undefined> => {
    setLoading(true);
    setError(null);
    try {
      const user = await loginUser({ email, password });
      localStorage.setItem(
        "userContext",
        JSON.stringify({ userId: user.userId, avatar: user.avatar })
      );
      setUserContext(user);
      return user;
    } catch (err) {
      enqueueSnackbar("Failed to log in", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
