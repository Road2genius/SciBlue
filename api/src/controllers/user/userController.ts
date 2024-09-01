import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel, { IUser } from "../../models/user/User";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
import { CustomError } from "../../types/error/customError";
import mongoose from "mongoose";
import { successHandler } from "../../middleware/responseHandler";
import { convertToPlainObject } from "../../utils/convertPlainObject";
import { CommentRequestModel } from "../../models/requests/Comment";
import { RequestModel } from "../../models/requests/Request";
import { generateActivationToken } from "../../config/email";
import { TransactionalEmailsApi, SendSmtpEmail } from "@getbrevo/brevo";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../../src/config/config";

// createUser requests the server to add a new user
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user: IUser = new UserModel({
      ...req.body,
      password: hashedPassword,
      activatedAccountStatus: false,
    });

    const userId: string = user._id.toString();
    const activationToken = generateActivationToken(userId);

    try {
      await sendConfirmationEmail(user.email, user.firstName, activationToken);

      await user.save();

      successHandler<IUser>(req, res, convertToPlainObject(user), HTTP_STATUS_CODES.CREATED);
    } catch (emailError) {
      throw emailError;
    }
  } catch (error) {
    next(error);
  }
};

// getUserById requests the server to get a user
export const getUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId: string = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const user: IUser | null = await UserModel.findById(userId).select("-password");

    if (!user) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }
    successHandler<IUser>(req, res, convertToPlainObject(user), HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

// deleteUser requests the server to delete a user
export const deleteUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId: string = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const user: IUser | null = await UserModel.findByIdAndDelete(userId);

    await CommentRequestModel.deleteMany({ userId });
    await RequestModel.deleteMany({ userId });

    if (!user) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    successHandler<{ message: string }>(
      req,
      res,
      {
        message: "User deleted successfully",
      },
      HTTP_STATUS_CODES.OK
    );
  } catch (error) {
    next(error);
  }
};

// updateUser requests the server to update a user
export const updateUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId: string = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const updatedData: IUser = req.body;

    if (updatedData.password) {
      updatedData.password = await bcrypt.hash(updatedData.password, 10);
    }

    const user: IUser | null = await UserModel.findByIdAndUpdate(userId, updatedData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!user) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }
    successHandler<IUser>(req, res, convertToPlainObject(user), HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};

export const getUsersList = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const users: IUser[] = await UserModel.find();
    successHandler<IUser[]>(req, res, users, HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};


export const sendConfirmationEmail = async (email: string, name: string, activationToken: string): Promise<void> => {
  const apiInstance = new TransactionalEmailsApi();
  const activationUrl = `${process.env.BACKEND_URL}/users/activation/${activationToken}`;

  const sendSmtpEmail = new SendSmtpEmail();

  sendSmtpEmail.to = [{ email, name }];
  sendSmtpEmail.sender = { email: process.env.EMAIL_FROM, name: "Sciblue" };
  sendSmtpEmail.subject = "Please Confirm Your Registration";
  sendSmtpEmail.htmlContent = `
    <html>
    <body>
      <h1>Confirm Your Registration</h1>
      <p>Click the link below to confirm your registration:</p>
      <a href="${activationUrl}">Activate Account</a>
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

export const activateAccount = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token } = req.params;

    if (!JWT_SECRET_KEY) {
      throw new Error("TOKEN is not defined.");
    }

    const decoded: any = jwt.verify(token, JWT_SECRET_KEY);

    const user = await UserModel.findById(decoded.userId);

    if (!user) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }

    if (user.activatedAccountStatus) {
      successHandler<{ message: string }>(
        req,
        res,
        {
          message: "Account already activated",
        },
        HTTP_STATUS_CODES.OK
      );
    }

    user.activatedAccountStatus = true;
    await user.save();

    res.cookie("accountActivated", "true", { maxAge: 10 * 60 * 1000, httpOnly: false });

    res.redirect(`${process.env.VITE_API_URL}/login`);
  } catch (error) {
    next(error);
  }
};
