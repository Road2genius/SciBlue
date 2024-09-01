import { useState } from "react";
import {
  requestResetPasswordAction,
  resetPasswordAction,
} from "../actions/auth/auth";
import { handleError } from "../utils/handleError";

interface UseResetPasswordFormProps {
  onSuccessResetpassword?: () => void;
  onErrorResetpassword?: (errorMessage: string) => void;
  onSuccessRequestResetpassword?: () => void;
  onErrorRequestResetpassword?: () => void;
}

export const useResetPassword = ({
  onSuccessResetpassword,
  onErrorResetpassword,
  onSuccessRequestResetpassword,
  onErrorRequestResetpassword,
}: UseResetPasswordFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetPassword = async (
    token: string,
    password: string
  ): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await resetPasswordAction(token, password);
      onSuccessResetpassword && onSuccessResetpassword();
    } catch (error) {
      const errorMessage = handleError(error);
      onErrorResetpassword && onErrorResetpassword(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetPasswordRequest = async (email: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await requestResetPasswordAction(email);
      onSuccessRequestResetpassword && onSuccessRequestResetpassword();
    } catch (err) {
      onErrorRequestResetpassword && onErrorRequestResetpassword();
    } finally {
      setLoading(false);
    }
  };

  return { resetPassword, resetPasswordRequest, loading, error };
};
