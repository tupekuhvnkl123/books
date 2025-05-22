import express from "express";
import checkAuth from "../middlewares/checkAuth";
import { createBook, deleteBook, updateBook } from "../controllers/admin";
import { checkAdmin } from "../middlewares/checkAdmin";
import {
  validateBook,
  validateBookUpdate,
} from "../utils/validations/book.validation";

const router = express.Router();
// @ts-expect-error
router.use(checkAuth as any, checkAdmin);
// @ts-expect-error
router.post("/", validateBook, createBook);
// @ts-expect-error
router.patch("/:bookId", validateBookUpdate, updateBook);
// @ts-expect-error
router.delete("/:bookId", deleteBook);

export default router;
