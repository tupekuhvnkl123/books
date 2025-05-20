import { body, ValidationChain } from "express-validator";
import User from "../../models/user";

const validateUsername: ValidationChain = body("username")
  .trim()
  .isLength({ min: 4 })
  .withMessage("Username must be at least 4 characters long")
  .matches(/[a-zA-Z]/)
  .withMessage("Username must contain at least one letter")
  .custom(async (value) => {
    const existingUser = await User.findOne({ username: value.toLowerCase() });
    if (existingUser) {
      throw new Error("Username is already taken");
    }
    return true;
  });

const validatePassword: ValidationChain = body("password")
  .trim()
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long")
  .matches(/\d/)
  .withMessage("Password must contain at least one number")
  .matches(/[A-Za-z]/)
  .withMessage("Password must contain at least one letter");

const validateName: ValidationChain = body("name")
  .trim()
  .isLength({ min: 2, max: 15 })
  .withMessage("Name must be between 2 and 15 characters long")
  .matches(/^[\p{L}\s]+$/u) // only letters and spaces
  .withMessage("Name must contain only letters");

export const validateRegister = [
  validateUsername,
  validatePassword,
  validateName,
];
