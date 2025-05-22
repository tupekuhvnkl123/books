import axios from "./axiosInstance";
import { BookType, NewBookDataType } from "../types/Books.types";

export const createBook = async (data: NewBookDataType): Promise<BookType> => {
  const response = await axios.post(`/admin`, data);
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
