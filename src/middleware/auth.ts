import { Response, NextFunction } from "express";
import { UserRequest } from "../types/types";
import jwt from 'jsonwebtoken';
import config from "../config";
import { UnauthorizedError } from "../common/errors";

export const auth = (req: UserRequest, res: Response, next: NextFunction): void => {
  const userToken = req.cookies.token;
  if (userToken) {
    const decodedData = jwt.verify(userToken, config.secretKey) as { role: string };
    req.userRole = decodedData.role;
    next();
  } else {
    throw new UnauthorizedError();
  }
}