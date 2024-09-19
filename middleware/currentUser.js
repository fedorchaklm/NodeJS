import { USER_ID_HEADER } from "../constants.js";

export const currentUser = (req, res, next) => {
  const userId = req.headers[USER_ID_HEADER];
  if (!userId) {
    return res.status(401).send("Unauthorized");
  }
  req.userId = userId;
  return next();
};
