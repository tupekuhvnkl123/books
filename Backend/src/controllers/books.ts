import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { ReqAuth } from "../types/types";
import User from "../models/user";
import Book from "../models/book";

export const getBooks = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { search } = req.query;

    const filter: Record<string, any> = {};

    if (search) {
      filter.title = { $regex: search, $options: "i" }; // Case-insensitive search
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

export const getBook = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { bookId } = req.params;

    const book = await Book.findById(bookId).populate("seller", "name");

    if (!book) {
      throw createHttpError.NotFound("Couldn't find book.");
    }

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

export const getPurchasedBooks = async (
  req: ReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.userId;
    const user = await User.findById(userId);

    if (!user || !userId) {
      throw createHttpError.NotFound("User not found");
    }

    res.status(200).json(user.purchased);
  } catch (error) {
    next(error);
  }
};

export const purchaseBook = async (
  req: ReqAuth,
  res: Response,
  next: NextFunction
) => {
  try {
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
};
