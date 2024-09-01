import { handleError } from "../../utils/handleError";
import { FeedbackForm } from "../../../../shared-types/feedback";
import { api } from "../api";

export const sendFeedback = async (feedback: FeedbackForm): Promise<void> => {
  try {
    await api.post<FeedbackForm, object>(
      "/feedback",
      { feedback },
      {
        "Content-Type": "application/json",
      }
    );
  } catch (error) {
    throw new Error(handleError(error));
  }
};
