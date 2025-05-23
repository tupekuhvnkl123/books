import { Router } from "express";
import authRoutes from "./auth";
import booksRoutes from "./books";
import adminRoutes from "./admin";

const router = Router();

router.use("/auth", authRoutes);

router.use("/admin", adminRoutes);

router.use("/books", booksRoutes);

export default router;
