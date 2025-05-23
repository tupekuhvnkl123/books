import express from "express";
import checkAuth from "../middlewares/checkAuth";
import {
  getBooks,
  getBook,
  getPurchasedBooks,
  purchaseBook,
} from "../controllers/books";

const router = express.Router();

router.get("/", getBooks);

router.get("/purchased", checkAuth, getPurchasedBooks);

router.post("/:bookId/purchase", checkAuth, purchaseBook);

router.get("/:bookId", getBook);

export default router;
