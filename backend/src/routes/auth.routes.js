import { Router } from "express";
import { registerUser, loginUser, verifiyUserEmail, resetPassword } from "../controllers/auth.controllers.js";

const router = Router()
router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

router.route("/verify-email/:token").get(verifiyUserEmail)
router.route("/reset-password/:resetToken").post(resetPassword)

export default router