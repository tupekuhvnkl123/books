import { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";

const errorHandler = (
  err: HttpError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err instanceof HttpError ? err.status : 500;
  const message =
    err instanceof HttpError ? err.message : "An unknown error occurred!";

  res.status(status);
  res.send({
    error: {
      status,
      message,
    },
  });
};

export default errorHandler;
