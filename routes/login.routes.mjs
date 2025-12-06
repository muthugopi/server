import { Router } from "express";
import { checkUser, isLogined } from "../controllers/auth.controller.mjs";
import { login } from "../controllers/login.controller.mjs";

const router = Router();

router.get('/', isLogined,checkUser, login);

export default router;