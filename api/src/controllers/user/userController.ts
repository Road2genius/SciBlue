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

// createUser requests the server to add a new user
export const createUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user: IUser = new UserModel({
      ...req.body,
      password: hashedPassword,
    });

    await user.save();
    successHandler<IUser>(req, res, convertToPlainObject(user), HTTP_STATUS_CODES.CREATED);
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

    if (!users.length) {
      const error: CustomError = new Error(ERROR_MESSAGES[ERROR_CODES.USERS_NOT_FOUND]);
      error.statusCode = HTTP_STATUS_CODES.NOT_FOUND;
      error.code = ERROR_CODES.USERS_NOT_FOUND;
      throw error;
    }

    successHandler<IUser[]>(req, res, users, HTTP_STATUS_CODES.OK);
  } catch (error) {
    next(error);
  }
};
