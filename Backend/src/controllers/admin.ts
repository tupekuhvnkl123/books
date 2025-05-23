import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import createHttpError from "http-errors";
import { createMongoBook, updateMongoBook } from "../services/mongoose/books";
import Book from "../models/book";
import { throwValidationErr } from "../utils/errors";

export const createBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    if (!userId) throw createHttpError.NotFound("User not found");

    throwValidationErr(req);

    const newBook = await createMongoBook({ data: req.body, userId });

    res.status(201).json(newBook);
  } catch (error) {
    next(error);
  }
};

export const updateBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;
    const userId = req.user?.userId;
    if (!userId) throw createHttpError.NotFound("User not found");

    throwValidationErr(req);

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
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const { bookId } = req.params;

    const book = await Book.findOneAndDelete({ seller: userId, _id: bookId });

    if (!book) throw createHttpError.NotFound("Couldn't find book.");

    await User.updateMany(
      { purchased: bookId },
      { $pull: { purchased: bookId } }
    );

    res.status(201).json({ message: "Book deleted successfully" });
  } catch (error) {
    next(error);
  }
};
