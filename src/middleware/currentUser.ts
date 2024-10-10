import { USER_ID_HEADER } from "../constants";
import { UnauthorizedError } from "../common/errors";

export const currentUser = (req, res, next) => {
  const userId = req.headers[USER_ID_HEADER];
  if (!userId) {
    throw new UnauthorizedError();
  }
  req.userId = userId;
  return next();
};
