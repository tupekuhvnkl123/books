import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import createHttpError from "http-errors";
import { validationResult } from "express-validator";
import { ReqAuth } from "../types/types";
import { singleImageUpload } from "../services/cloudinary/actions";
import { createMongoBook, updateMongoBook } from "../services/mongoose/books";
import Book from "../models/book";

export const createBook = async (
  req: ReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      throw createHttpError(404, "User not found");
    }

    // Handle validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty() || !userId) {
      throw createHttpError[400](errors.array()[0].msg);
    }

    const newProduct = await createMongoBook({ data: req.body, userId });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: ReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const { bookId } = req.params;

    if (!userId) {
      throw createHttpError(404, "User not found");
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw createHttpError(400, errors.array()[0].msg);
    }

    const updatedBook = await updateMongoBook({
      bookId,
      userId,
      data: req.body,
    });

    res.status(200).json(updatedBook);
  } catch (error) {
    next(error);
  }
};

export const deleteBook = async (
  req: ReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;

    const { bookId } = req.params;

    if (!userId) {
      throw createHttpError.NotFound("User not found");
    }

    const book = await Book.findOneAndDelete({
      seller: userId,
      _id: bookId,
    });

    if (!book) {
      throw createHttpError.NotFound("Couldn't find book.");
    }

    await User.updateMany(
      { purchased: bookId },
      { $pull: { purchased: bookId } }
    );

    res.status(201).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};
