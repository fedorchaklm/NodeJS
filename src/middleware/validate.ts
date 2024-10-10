import { Request, Response, NextFunction } from "express";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string()
    .max(254)
    .pattern(new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-z]{2,}$"))
    .required(),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/)
    .required(),
});

export const validateRegisterData = (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);
  if (!error) {
    next();
  } else {
    res.status(422).send("Email or password format is invalid");
  }
};
