import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import createHttpError from "http-errors";
import { UserJwtPayloadType } from "../types/user.types";

dotenv.config();

const JWT_SECRET = process.env.JWT_PRIVATE_KEY;

export const createToken = (
  userData: UserJwtPayloadType,
  expiresIn: string
) => {
  const payload = { user: userData };

  if (!JWT_SECRET) {
    throw new Error("JWT_PRIVATE_KEY is not set in the environment variables");
  }

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    algorithm: "HS256",
  });

  return token;
};

export const getDecodedToken = (token: string) => {
  if (!JWT_SECRET) {
    throw createHttpError.InternalServerError("JWT secret key not configured.");
  }

  return jwt.verify(token, JWT_SECRET) as JwtPayload;
};
