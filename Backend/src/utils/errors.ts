import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { Request } from "express";

export const throwValidationErr = <T extends Request>(req: T) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw createHttpError(400, errors.array()[0].msg);
  }
};
