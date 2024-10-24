import { NextFunction, Response } from "express";
import { HttpError } from "../common/errors";

const errorHandler =  (error: Error, _: any, res: Response, next: NextFunction) => {
  const { statusCode } = error as HttpError;

  res.status(statusCode || 500).json(
    {
      message: error.message
    }
  );
}

export default errorHandler;