import axiosInstance from "./axiosInstance";
import { BookPreviewType, BookType } from "../types/Books.types";

export const getBooks = async ({
  searchValue,
}: {
  searchValue: string;
}): Promise<BookPreviewType[]> => {
  const params = new URLSearchParams();

  if (searchValue) {
    params.append("search", searchValue);
  }

  const response = await axiosInstance.get(`/books?${params.toString()}`);

  return response.data;
};

export const getBookById = async (bookId: string): Promise<BookType> => {
  const response = await axiosInstance.get(`/books/${bookId}`);

  return response.data;
};

export const getPurchasedBooks = async (): Promise<BookPreviewType[]> => {
  const response = await axiosInstance.get(`/books/purchased`);

  return response.data;
};

export const purchaseBook = async (bookId: string) => {
  const response = await axiosInstance.post(`/books/${bookId}/purchase`);

  return response.data;
};
