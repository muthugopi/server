import { Router } from "express";
import { checkUser, isLogined } from "../controllers/auth.controller.mjs";
import { login } from "../controllers/login.controller.mjs";
import passport from "../src/utils/passport.mjs";

const router = Router();

router.post(
  "/",
  isLogined,
  passport.authenticate("local"),
  login
);


export default router;