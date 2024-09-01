import express from "express";
import { ENDPOINT } from "../http";
import { sendFeedback } from "../../../src/controllers/feedback/feedbackController";

const feedbackRoutes = express.Router();

// feedback
feedbackRoutes.post(ENDPOINT.FEEDBACK.SUBMIT_FEEDBACK_EMAIL, sendFeedback);

export default feedbackRoutes;
