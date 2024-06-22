import { Document } from "mongoose";

export const convertToPlainObject = <T>(data: T): T | object => {
  if (data && (data as unknown as Document).toObject) {
    return (data as unknown as Document).toObject();
  }
  return data;
};
