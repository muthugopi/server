import { Router } from "express";
import { login } from "../controllers/login.controller.mjs";
import passport from "../src/utils/passport.mjs";

const router = Router();

router.post(
  "/",
  passport.authenticate("local"),
  login
);


export default router;