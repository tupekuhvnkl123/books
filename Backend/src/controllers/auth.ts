import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import User from "../models/user";
import { createToken } from "../services/jwt";

const throwIfInvalid = (req: Request) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw createHttpError(400, errors.array()[0].msg);
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    throwIfInvalid(req);

    const { username, password, name } = req.body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      username: username.toLowerCase(),
      password: hashedPassword,
      name,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      throw createHttpError.Unauthorized(
        "The username or password is incorrect, please try again"
      );
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw createHttpError.Unauthorized(
        "The username or password is incorrect, please try again"
      );
    }

    const userResponse = {
      id: user.id,
      role: user.role,
    };

    const accessToken = createToken(userResponse, "30d");

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};
