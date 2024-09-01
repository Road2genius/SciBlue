import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel, { IUser } from "../../models/user/User";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
import { CustomError } from "../../types/error/customError";
import jwt from "jsonwebtoken";
import { successHandler } from "../../middleware/responseHandler";
import { JWT_SECRET_KEY, REFRESH_TOKEN } from "../../../src/config/config";
import { generateActivationToken } from "../../../src/config/email";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";

export const loginUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const user: IUser | null = await UserModel.findOne({ email });

    if (!user) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.WRONG_PASSWORD]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.WRONG_PASSWORD;
      throw error;
    }

    if (!JWT_SECRET_KEY) {
      throw new Error("TOKEN is not defined.");
    }

    if (!REFRESH_TOKEN) {
      throw new Error("TOKEN is not defined.");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN, { expiresIn: "7d" });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    user.refreshToken = refreshToken;
    await user.save();

    successHandler<{ token: string; userId: string; avatar: string }>(
      req,
      res,
      {
        token,
        userId: user._id.toString(),
        avatar: user.avatar,
      },
      HTTP_STATUS_CODES.OK
    );
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { userId } = req.params;

    const user: IUser | null = await UserModel.findById(userId);

    if (!user) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }

    user.refreshToken = "";
    await user.save();

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    successHandler<{ message: string }>(
      req,
      res,
      {
        message: "Successfully logged out",
      },
      HTTP_STATUS_CODES.OK
    );
  } catch (error) {
    next(error);
  }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  const { refreshToken } = req.cookies;

  if (!refreshToken) {
    const error: CustomError = new Error("Refresh Token not found");
    error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
    throw error;
  }

  if (!REFRESH_TOKEN) {
    throw new Error("TOKEN is not defined.");
  }

  try {
    const payload = jwt.verify(refreshToken, REFRESH_TOKEN) as { userId: string };

    const user = await UserModel.findById(payload.userId);
    if (!user || user.refreshToken !== refreshToken) {
      const error: CustomError = new Error("Invalid refresh token");
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      throw error;
    }

    if (!JWT_SECRET_KEY) {
      throw new Error("TOKEN is not defined.");
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    successHandler<{ token: string }>(
      req,
      res,
      {
        token,
      },
      HTTP_STATUS_CODES.OK
    );
  } catch (error) {
    next(error);
  }
};

export const requestPasswordReset = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }

    const userId: string = user._id.toString();
    const resetPasswordToken = generateActivationToken(userId);

    try {
      await sendResetPasswordEmail(user.email, user.firstName, resetPasswordToken);

      user.resetPasswordToken = resetPasswordToken;
      user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

      await user.save();

      successHandler<{ message: string }>(
        req,
        res,
        {
          message: "Email sent",
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

export const sendResetPasswordEmail = async (
  email: string,
  name: string,
  resetPasswordToken: string
): Promise<void> => {
  const apiInstance = new TransactionalEmailsApi();
  const resetPasswordUrl = `${process.env.VITE_API_URL}/reset-password/${resetPasswordToken}`;

  const sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.to = [{ email, name }];
  sendSmtpEmail.sender = { email: process.env.EMAIL_FROM, name: "Sciblue" };
  sendSmtpEmail.subject = "Reset your password";
  sendSmtpEmail.htmlContent = `
    <html>
    <body>
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password:</p>
      <a href="${resetPasswordUrl}">Activate Account</a>
      <p><strong>Please note: This link is valid for 15 minutes.</strong></p>
    </body>
    </html>
  `;

  try {
    await apiInstance.sendTransacEmail(sendSmtpEmail, {
      headers: { "api-key": process.env.BREVO_API_KEY || "" },
    });
    console.log("Email sent successfully:");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { password } = req.body;
    const { token } = req.params;

    if (!password) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      error.message = "Password is required";
      throw error;
    }

    const user = await UserModel.findOne({ resetPasswordToken: token });

    if (!user || (user.resetPasswordExpires && user.resetPasswordExpires < Date.now())) {
      const error: CustomError = new Error("Invalid or expired token.");
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.details = [];
      throw error;
    }

    if (!user) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    successHandler<{ message: string }>(
      req,
      res,
      {
        message: "Password reset successfully",
      },
      HTTP_STATUS_CODES.OK
    );
  } catch (error) {
    next(error);
  }
};
