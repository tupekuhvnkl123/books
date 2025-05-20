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
router.get("/:bookId", getBook);

router.get("/purchased", checkAuth as any, getPurchasedBooks as any);

router.post("/:bookId/purchase", checkAuth as any, purchaseBook as any);

export default router;
