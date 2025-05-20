import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import createHttpError from "http-errors";
import { NextFunction, Response } from "express";
import { ReqAuth } from "../types/types";
dotenv.config();

const JWT_SECRET = process.env.JWT_PRIVATE_KEY;

export default async (req: ReqAuth, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      throw createHttpError.Unauthorized("Authentication failed.");
    }

    if (!JWT_SECRET) {
      throw createHttpError.InternalServerError(
        "JWT secret key not configured."
      );
    }

    const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

    if (!decodedToken.user.id) {
      throw createHttpError.BadRequest("Invalid token format.");
    }

    req.user = { userId: decodedToken.user.id, role: decodedToken.user.role };
    next();
  } catch (err) {
    return next(err);
  }
};
