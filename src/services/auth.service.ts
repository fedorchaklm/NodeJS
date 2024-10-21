import { APP_ROLES, User } from "../types/types";
import config from "../config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createAccessToken = (role: APP_ROLES) => {
  const token: string = jwt.sign({ role }, config.secretKey, {
    expiresIn: 3600,
  });
  return token;
};

export const createRefreshToken = () => {
  const refreshToken: string = jwt.sign({}, config.secretKeyForRefreshToken, {
    expiresIn: "2 days",
  });
  return refreshToken;
};

export const checkPassword = async (password: string, currentUser: User): Promise<boolean> => {
  const match = await bcrypt.compare(password, currentUser.password);
  return match;
};
