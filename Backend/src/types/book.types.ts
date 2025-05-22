import { InferSchemaType } from "mongoose";
import { bookSchema } from "../models/book";

export type BookSchemaType = InferSchemaType<typeof bookSchema>;

export type BookType = {
  title: string;
  description: string;
  img: string;
  price: number;
  author: string;
  publisher: string;
};
