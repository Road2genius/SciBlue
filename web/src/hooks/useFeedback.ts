import { useState } from "react";
import { handleError } from "../utils/handleError";
import { FeedbackForm } from "../../../shared-types/feedback";
import { sendFeedbackAction } from "../actions/feedback/feedback";

interface UseSendFeedbackFormProps {
  onSuccessSendFeedback?: () => void;
  onErrorSendFeedback?: (errorMessage: string) => void;
}

export const useSendFeedback = ({
  onSuccessSendFeedback,
  onErrorSendFeedback,
}: UseSendFeedbackFormProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitSendFeedback = async (feedback: FeedbackForm): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await sendFeedbackAction(feedback);
      onSuccessSendFeedback && onSuccessSendFeedback();
    } catch (error) {
      const errorMessage = handleError(error);
      onErrorSendFeedback && onErrorSendFeedback(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { submitSendFeedback, loading, error };
};
