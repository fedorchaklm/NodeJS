import * as userService from "../services/user.service";
import { Request, Response } from "express";

export const signUp = (req: Request, res: Response) => {
  const { id, name, email, ...rest } = userService.registerNewUser(req.body);
  res.status(200).json({ id, name, email });
};
