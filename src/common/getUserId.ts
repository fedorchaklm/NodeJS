import { Request } from "express";
import { USER_ID_HEADER } from "../constants";
import { UnauthorizedError } from "./errors";

export const getUserId = (req: Request): string => {
  const userId = req.headers[USER_ID_HEADER];
  if (typeof userId !== 'string') {
    throw new UnauthorizedError();
  }
  return userId;
};
