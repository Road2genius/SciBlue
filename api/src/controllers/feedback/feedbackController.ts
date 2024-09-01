import UserModel from "../../../src/models/user/User";
import { NextFunction, Request, Response } from "express";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
import { successHandler } from "../../middleware/responseHandler";
import { CustomError } from "../../../src/types/error/customError";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import { FeedbackForm } from "../../../../shared-types/feedback";

export const sendFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { feedback } = req.body;

    if (feedback.userId) {
      const user = await UserModel.findById(feedback.userId);

      if (!user) {
        const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
        error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
        error.code = ERROR_CODES.USER_NOT_FOUND;
        throw error;
      }

      feedback.email = user.email;
      feedback.firstname = user.firstName;
      feedback.lastname = user.lastName;
      feedback.organizationAffiliated = user.organizationAffiliated;
    }

    try {
      await sendEmailToAdmin(feedback);

      successHandler<{ message: string }>(
        req,
        res,
        {
          message: "Feedback sent successfully",
        },
        HTTP_STATUS_CODES.OK
      );
    } catch (emailError) {
      throw emailError;
    }
  } catch (error) {
    next(error);
  }
};

export const sendEmailToAdmin = async (feedback: FeedbackForm): Promise<void> => {
  const apiInstance = new TransactionalEmailsApi();

  const sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.to = [{ email: process.env.EMAIL_FROM!, name: "Sciblue team" }];
  sendSmtpEmail.cc = [
    { email: process.env.EMAIL_ANTOINE!, name: "CC Antoine" },
    { email: process.env.EMAIL_CARO!, name: "CC Caroline" },
  ];
  sendSmtpEmail.sender = { email: process.env.EMAIL_FROM!, name: `${feedback.firstname} ${feedback.lastname}` };
  sendSmtpEmail.subject = "User Feedback Notification";
  sendSmtpEmail.htmlContent = `
    <html>
    <body>
        <h1>New Feedback from User</h1>
        <p>User Name: ${feedback.firstname} - ${feedback.lastname}</p>
        <p>User Email: ${feedback.email}</p>
        <p>Organization: ${feedback.organizationAffiliated}</p>
        <p>Message: ${feedback.message}</p>
    </body>
    </html>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail, {
      headers: { "api-key": process.env.BREVO_API_KEY || "" },
    });
    console.log("Feedback email sent successfully to Sciblue team.");
  } catch (error) {
    console.error("Error sending feedback email to Sciblue team:", error);
    throw error;
  }
};
