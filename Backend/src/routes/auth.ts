import express from "express";
import { login, register } from "../controllers/auth";
import { validateRegister } from "../utils/validations/register.validation";

const router = express.Router();

router.post("/login", login);

router.post("/register", validateRegister, register);

export default router;
