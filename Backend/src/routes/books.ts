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
// @ts-expect-error
router.get("/purchased", checkAuth, getPurchasedBooks);

// @ts-expect-error
router.post("/:bookId/purchase", checkAuth, purchaseBook);
router.get("/:bookId", getBook);

export default router;
