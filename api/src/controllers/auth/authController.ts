import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import crypto from "crypto";
import UserModel, { IUser } from "../../models/user/User";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS_CODES } from "../../constants/error/errorCodes";
import { CustomError } from "../../types/error/customError";
import jwt from "jsonwebtoken";
import { successHandler } from "../../middleware/responseHandler";
import { sendEmail } from "../../config/email";
import cache from "../../middleware/auth";

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

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret_key", {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId: user._id }, "refresh_token_key", { expiresIn: "7d" });

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

  try {
    const payload = jwt.verify(refreshToken, "refresh_token_key") as { userId: string };

    const user = await UserModel.findById(payload.userId);
    if (!user || user.refreshToken !== refreshToken) {
      const error: CustomError = new Error("Invalid refresh token");
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, "your_jwt_secret_key", {
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

    const token = crypto.randomBytes(32).toString("hex");

    cache.set(email, token);

    const resetUrl = `${process.env.BASE_URL}/reset-password?token=${token}`;
    const message = `You requested a password reset. Click this link to reset your password: ${resetUrl}`;
    await sendEmail(user.email, "Password Reset Request", message);

    successHandler<{ message: string }>(
      req,
      res,
      {
        message: "Email sent",
      },
      HTTP_STATUS_CODES.OK
    );
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { token, newPassword } = req.body;
    const email = req.query.email as string | undefined;

    if (!email) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      error.message = "Email is required";
      throw error;
    }

    if (!newPassword) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      error.message = "Password is required";
      throw error;
    }

    const cachedToken = cache.get(email) as string | undefined;

    if (!cachedToken || cachedToken !== token) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]);
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      error.message = "Invalid or expired token";
      throw error;
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    cache.del(email);

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
