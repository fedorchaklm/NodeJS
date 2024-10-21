import { Response, NextFunction } from "express";
import { ForbiddenError } from "../common/errors";
import { UserRequest } from "../types/types";

export const checkPermissions = (roles: Array<string>) => {
  return (req: UserRequest, res: Response, next: NextFunction) => {
    const { userRole } = req;
    if (userRole && roles.includes(userRole)) {
      next();
    } else {
      throw new ForbiddenError();
    }
  };
};
