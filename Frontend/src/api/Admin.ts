import axiosInstance from "./axiosInstance";
import { BookType, NewBookDataType } from "../types/Books.types";

type UpdateBookPayload = {
  bookId: string;
  data: NewBookDataType;
};

export const createBook = async (data: NewBookDataType): Promise<BookType> => {
  const response = await axiosInstance.post(`/admin`, data);

  return response.data;
};

export const updateBook = async ({
  bookId,
  data,
}: UpdateBookPayload): Promise<BookType> => {
  const response = await axiosInstance.patch(`/admin/${bookId}`, data);

  return response.data;
};

export const deleteBook = async (bookId: string) => {
  const response = await axiosInstance.delete(`/admin/${bookId}`);

  return response.data;
};
