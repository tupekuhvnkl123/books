import express from "express";
import checkAuth from "../middlewares/checkAuth";
import { createBook, deleteBook, updateBook } from "../controllers/admin";
import checkAdmin from "../middlewares/checkAdmin";
import {
  validateBook,
  validateBookUpdate,
} from "../utils/validations/book.validation";

const router = express.Router();

router.use(checkAuth, checkAdmin);

router.post("/", validateBook, createBook);

router.patch("/:bookId", validateBookUpdate, updateBook);

router.delete("/:bookId", deleteBook);

export default router;
