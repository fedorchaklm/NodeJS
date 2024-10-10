import { USER_ID_HEADER } from "../constants.js";
import { UnauthorizedError } from "../common/errors.js";

export const currentUser = (req, res, next) => {
  const userId = req.headers[USER_ID_HEADER];
  if (!userId) {
    throw new UnauthorizedError();
  }
  req.userId = userId;
  return next();
};
