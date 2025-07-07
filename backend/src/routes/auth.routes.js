import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifiyUserEmail,
  resetPassword,
  forgotPassword,
} from "../controllers/auth.controllers.js";

const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.route("/verify-email/:token").get(verifiyUserEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);

export default router;
