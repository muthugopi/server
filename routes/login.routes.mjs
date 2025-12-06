import { Router } from "express";
import { checkUser } from "../controllers/auth.controller.mjs";
import { login } from "../controllers/login.controller.mjs";

const router = Router();

router.get('/', checkUser, login);

export default router;