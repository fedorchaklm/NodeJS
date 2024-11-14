import { USER_ID_HEADER } from "../constants";
import { UnauthorizedError } from "../common/errors";
import { NextFunction, Response, Request } from "express";

export const currentUser = (req: Request, res: Response, next: NextFunction) => {
  const userId = req.headers[USER_ID_HEADER];
  if (!userId) {
    throw new UnauthorizedError();
  }
  return next();
};
