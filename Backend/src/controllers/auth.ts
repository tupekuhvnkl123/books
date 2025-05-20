import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/user";
import { validationResult } from "express-validator";
import createHttpError from "http-errors";
import { createToken } from "../services/jwt";

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError[400](errors.array()[0].msg);
    }

    const { username, password, name } = req.body;

    // Hash the password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

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
        "שם המשתמש או הסיסמה שגויים, אנא נסה שוב"
      );
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw createHttpError.Unauthorized(
        "שם המשתמש או הסיסמה שגויים, אנא נסה שוב"
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
