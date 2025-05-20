import express from "express";
import checkAuth from "../middlewares/checkAuth";
import { createBook, deleteBook, updateBook } from "../controllers/admin";
import { checkAdmin } from "../middlewares/checkAdmin";
import {
  validateBook,
  validateBookUpdate,
} from "../utils/validations/book.validation";

const router = express.Router();

router.use(checkAuth as any, checkAdmin as any);

router.post("/", validateBook, createBook as any);

router.patch("/:bookId", validateBookUpdate, updateBook as any);

router.delete("/:bookId", deleteBook as any);

export default router;
