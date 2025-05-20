import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ReqAuth } from "../types/types";
import { UserRole } from "../types/user.types";

export const checkAdmin = (req: ReqAuth, res: Response, next: NextFunction) => {
  const userRole = req.user?.role;

  if (!userRole) {
    return next(createHttpError.Unauthorized("User not authenticated."));
  }

  if (userRole !== UserRole.ADMIN) {
    return next(createHttpError.Forbidden("Admin access required."));
  }

  next();
};
