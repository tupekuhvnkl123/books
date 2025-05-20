import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { UserPayloadType } from "../types/types";

dotenv.config();

const JWT_SECRET = process.env.JWT_PRIVATE_KEY;

export const createToken = (userData: UserPayloadType, expiresIn: string) => {
  const payload = {
    user: userData,
  };

  if (!JWT_SECRET) {
    throw new Error("JWT_PRIVATE_KEY is not set in the environment variables");
  }

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn,
    algorithm: "HS256",
  });

  return token;
};
