import { Router } from "express";
import {
  registerUser,
  loginUser,
  verifiyUserEmail,
  resetPassword,
  forgotPassword,
  refreshAccessToken,
  logoutUser,
  resendEmailVerification,
  getUserProfile,
} from "../controllers/auth.controllers.js";
import { isLoggedIn } from "../middlewares/auth.middleware.js";


const router = Router();
router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/profile").get(isLoggedIn, getUserProfile);

router.route("/verify-email/:token").get(verifiyUserEmail);
router.route("/forgot-password").post(forgotPassword);
router.route("/reset-password/:token").post(resetPassword);
router.route("/refresh-token").post(refreshAccessToken)
router.route("/logout").get(isLoggedIn, logoutUser)
router.route("/resend-email").post(resendEmailVerification)

export default router;
