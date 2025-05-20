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

// export type NewProductDataType = {
//   title?: string;
//   description?: string;
//   images?: string[];
//   price?: number;
//   category?: string;
//   city?: string;
//   phoneNumber?: string;
// };
