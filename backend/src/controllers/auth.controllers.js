import { asyncHandler } from "../utils/async-handler.js";
import { ApiError } from "../utils/api-error.js";
import { ApiResponse } from "../utils/api-response.js";
import { User } from "../models/user.models.js";
import {
  emailVerificationMailGenContent,
  forgotPasswordMailGenContent,
  sendMail,
} from "../utils/mail.js";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import {
  registerUserSchema,
  LoginUserSchema,
  forgotPasswordSchema,
  verifyEmailSchema,
  resetPasswordSchema,
  updateProfileSchema,
} from "../schemas/auth.schema.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { fullname, username, email, password } = registerUserSchema.parse(
    req.body,
  );

  const existedUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existedUser) {
    throw new ApiError(409, "User already exists with this email or username");
  }

  const unHashedtoken = crypto.randomBytes(20).toString("hex");

  const hashedToken = crypto
    .createHash("sha256")
    .update(unHashedtoken)
    .digest("hex");
  const tokenExpiry = Date.now() + 20 * 60 * 1000;

  const emailVerificationUrl = `${process.env.FRONTEND_URL}/api/v1/auth/verifiy-email/${unHashedtoken}`;

  const mailGen = emailVerificationMailGenContent(
    fullname,
    emailVerificationUrl,
  );

  const user = await User.create({
    fullname,
    username,
    email,
    password,
    emailVerificationToken: hashedToken,
    emailVerificationExpiry: tokenExpiry,
  });

  await sendMail({
    email,
    subject: "email verification",
    mailGenContent: mailGen,
  });

  return res.status(201).json(
    new ApiResponse(201, "User registered successfully", {
      user,
    }),
  );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = LoginUserSchema.parse(req.body);

  console.log("user login", req.body);
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(404, "user dose not exeit with this email");
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (!user.isEmailVerified) {
    throw new ApiError(401, "please  verify your email");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  const isProduction = process.env.NODE_ENV === "production";

  const refreshCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  };

  const accessCookieOptions = {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
  };

  //  Set cookies
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
  res.cookie("accessToken", accessToken, accessCookieOptions);

  return res.status(200).json(
    new ApiResponse(200, "User logged in successfully", {
      user: {
        email: user.email,
        accessToken,
      },
    }),
  );
});

export const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken;
  if (!token) {
    throw new ApiError(400, "You are not logged in");
  }

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = forgotPasswordSchema.parse(req.body);
  const user = await User.findOne({ email });
  if (!user) {
    throw new ApiError(400, "user not exsist with this email");
  }
  const { hashedToken, unHashedtoken, tokenExpiry } =
    await user.generateTemporaryToken();

  user.forgotPasswordToken = hashedToken;
  user.forgotPasswordExpiry = tokenExpiry;
  await user.save();

  const passwordRestUrl = `${process.env.FRONTEND_URL}/api/v1/auth/reset-password/${unHashedtoken}`;

  sendMail({
    email: user.email,
    subject: "Forgot Password",
    mailGenContent: forgotPasswordMailGenContent(
      user.fullname,
      passwordRestUrl,
    ),
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Password reset link sent to your email", {
        linkExpiry: tokenExpiry,
      }),
    );
});

export const verifiyUserEmail = asyncHandler(async (req, res) => {
  const { token } = verifyEmailSchema.parse({ token: req.params?.token });

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({ emailVerificationToken: hashedToken });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isEmailVerified = true;
  user.emailVerificationToken = undefined;
  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Email verified successfully", {
        user,
        verified: user.isEmailVerified,
      }),
    );
});

export const resetPassword = asyncHandler(async (req, res) => {
  const { token, newPassword, confirmPassword } = resetPasswordSchema.parse({
    token: req.params?.token,
    newPassword: req.body.newPassword,
    confirmPassword: req.body.confirmPassword,
  });

  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({ forgotPasswordToken: hashedToken });

  if (!user) {
    throw new ApiError(404, "Invalid or expired token");
  }

  if (Date.now() > user.forgotPasswordExpiry) {
    throw new ApiError(400, "Token expired! Please request a new reset link");
  }

  user.password = newPassword;
  user.forgotPasswordToken = null;
  user.forgotPasswordExpiry = Date.now();
  await user.save();

  return res.status(200).json(new ApiResponse(200, "Password reset successfully", {resetStatus: true}))
});
