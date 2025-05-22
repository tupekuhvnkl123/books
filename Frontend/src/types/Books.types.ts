import { UserType } from "./Users.types";

export type BookType = {
  id: string;
  title: string;
  description: string;
  img: string;
  price: number;
  seller: UserType;
  author: string;
  publisher: string;
};

export type BookPreviewType = Pick<BookType, "id" | "title" | "img" | "price">;

export type NewBookDataType = {
  title?: string;
  description?: string;
  img?: string;
  price?: number;
  author?: string;
  publisher?: string;
};

export type NewBookErrorsType = {
  title?: string;
  description?: string;
  img?: string;
  price?: string;
  author?: string;
  publisher?: string;
};
