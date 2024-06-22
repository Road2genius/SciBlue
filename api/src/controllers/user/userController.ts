import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";
import User, { IUser } from "../../models/user/User";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS_CODES,
} from "../../constants/error/errorCodes";
import { CustomError } from "../../types/error/customError";
import mongoose from "mongoose";
import { successHandler } from "../../middleware/responseHandler";

// createUser requests the server to add a new user
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      const error: CustomError = new Error(
        ERROR_MESSAGES[ERROR_CODES.USER_ALREADY_EXISTS]
      );
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.USER_ALREADY_EXISTS;
      throw error;
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user: IUser = new User({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();
    successHandler<IUser>(req, res, user, HTTP_STATUS_CODES.CREATED);
  } catch (error) {
    next(error);
  }
};

// getUserById requests the server to get a user
export const getUserById = async (userId: string): Promise<IUser> => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error: CustomError = new Error(
      ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]
    );
    error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
    error.code = ERROR_CODES.USER_NOT_FOUND;
    throw error;
  }

  const user: IUser | null = await User.findById(userId);

  if (!user) {
    const error: CustomError = new Error(
      ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]
    );
    error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
    error.code = ERROR_CODES.USER_NOT_FOUND;
    throw error;
  }

  return user;
};

// deleteUser requests the server to delete a user
export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = req.params.id;
    console.log("userID", userId);

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error: CustomError = new Error(
        ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]
      );
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }

    await User.deleteOne({ _id: userId });

    successHandler<{ message: string }>(req, res, {
      message: "User deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
