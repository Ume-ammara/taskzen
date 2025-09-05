import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";


export const isLoggedIn = asyncHandler(async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      res.clearCookie("refreshToken");
      throw new ApiError(401, "Refresh token expired please login");
    }
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];

    if (!token) {
      console.log("Token", token);
      throw new ApiError(401, "ACCESS_TOKEN_EXPIRED");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    req.user = decodedToken;

    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid access token", error);
  }
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  if (req.user.role !== "admin") {
    throw new ApiError(403, "Unauthorized request");
  }
  next();
});
