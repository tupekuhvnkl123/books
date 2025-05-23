import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { UserRole } from "../types/user.types";

const checkAdmin = (req: Request, res: Response, next: NextFunction) => {
  const userRole = req.user?.role;

  if (!userRole) {
    return next(createHttpError.Unauthorized("User not authenticated."));
  }

  if (userRole !== UserRole.ADMIN) {
    return next(createHttpError.Forbidden("Admin access required."));
  }

  next();
};

export default checkAdmin;
