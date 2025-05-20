import createHttpError from "http-errors";
import Book from "../../models/book";
import { BookType } from "../../types/book.types";
import { singleImageUpload } from "../cloudinary/actions";

type CreateMongoBookParams = {
  data: BookType;
  userId: string;
};

type UpdateMongoBookParams = {
  bookId: string;
  userId: string;
  data: Partial<BookType>;
};

export const createMongoBook = async ({
  data,
  userId,
}: CreateMongoBookParams) => {
  try {
    const { title, description, price, img, author, publisher } = data;

    const imageUrl = await singleImageUpload({
      image: img,
      path: `${userId}/books`,
    });

    const newBook = new Book({
      title,
      description,
      price,
      img: imageUrl,
      author,
      publisher,
      seller: userId,
    });

    await newBook.save();

    return newBook;
  } catch (err) {
    throw createHttpError(500, "Creating book failed");
  }
};

export const updateMongoBook = async ({
  bookId,
  userId,
  data,
}: UpdateMongoBookParams) => {
  try {
    const fieldsToUpdate = { ...data };

    if (data.img) {
      const imageUrl = await singleImageUpload({
        image: data.img,
        path: `${userId}/books`,
      });
      fieldsToUpdate.img = imageUrl;
    }

    const updatedBook = await Book.findOneAndUpdate(
      { _id: bookId, seller: userId },
      { $set: fieldsToUpdate },
      { new: true }
    );

    if (!updatedBook) {
      throw createHttpError(404, "Book not found");
    }

    return updatedBook;
  } catch (err) {
    throw createHttpError(500, "Updating book failed");
  }
};
