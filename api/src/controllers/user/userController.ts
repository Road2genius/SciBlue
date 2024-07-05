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
// This is not and endpoint
export const getUserById = async (userId: string): Promise<IUser> => {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    const error: CustomError = new Error(
      ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]
    );
    error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
    error.code = ERROR_CODES.VALIDATION_ERROR;
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

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error: CustomError = new Error(
        ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]
      );
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const user: IUser | null = await User.findByIdAndDelete(userId);

    if (!user) {
      const error: CustomError = new Error(
        ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]
      );
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }

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
export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const userId: string = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      const error: CustomError = new Error(
        ERROR_MESSAGES[ERROR_CODES.VALIDATION_ERROR]
      );
      error.statusCode = HTTP_STATUS_CODES.BAD_REQUEST;
      error.code = ERROR_CODES.VALIDATION_ERROR;
      throw error;
    }

    const updatedData: IUser = req.body;

    const user: IUser | null = await User.findByIdAndUpdate(
      userId,
      updatedData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!user) {
      const error: CustomError = new Error(
        ERROR_MESSAGES[ERROR_CODES.USER_NOT_FOUND]
      );
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USER_NOT_FOUND;
      throw error;
    }
    successHandler<IUser>(req, res, user, HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};
