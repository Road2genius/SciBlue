import { FeedbackForm } from "../../../../shared-types/feedback";
import { sendFeedback } from "../../services/feedback/feedback";
import { handleError } from "../../utils/handleError";

export const sendFeedbackAction = async (
  feedback: FeedbackForm
): Promise<void> => {
  try {
    await sendFeedback(feedback);
  } catch (error) {
    throw new Error(handleError(error));
  }
};
