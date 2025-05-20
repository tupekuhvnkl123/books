import axios from "./axiosInstance";
import { BookType } from "../types/Books.types";

export const createBook = async (): Promise<BookType> => {
  const response = await axios.post(`/admin`);
  return response.data;
};

export const updateBook = async ({
  bookId,
}: {
  bookId: string;
}): Promise<BookType> => {
  const response = await axios.patch(`/admin/${bookId}`);
  return response.data;
};

export const deleteBook = async (bookId: string) => {
  const response = await axios.delete(`/admin/${bookId}`);
  return response.data;
};
