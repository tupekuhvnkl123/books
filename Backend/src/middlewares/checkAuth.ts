import dotenv from "dotenv";
import createHttpError from "http-errors";
import { NextFunction, Request, Response } from "express";
import { getDecodedToken } from "../services/jwt";

dotenv.config();

const checkAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader?.split(" ")[1];

    if (!token) {
      throw createHttpError.Unauthorized("Authentication failed.");
    }

    const decodedToken = getDecodedToken(token);

    if (!decodedToken.user.id) {
      throw createHttpError.BadRequest("Invalid token format.");
    }

    const { id: userId, role } = decodedToken.user;

    req.user = { userId, role };

    next();
  } catch (err) {
    return next(err);
  }
};

export default checkAuth;
