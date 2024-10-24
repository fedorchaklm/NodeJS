import * as userService from "../services/user.service";
import { NextFunction, Request, Response } from "express";

export const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, name, email, ...rest } = await userService.registerNewUser(req.body);
    res.status(200).json({ id, name, email });
  } catch (e) {
    next(e);
  }
};
