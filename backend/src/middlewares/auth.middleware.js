import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken";

// export const isLoggedIn = asyncHandler(async (req, res, next) => {
//   try {
//     const token =
//       req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1];
//     console.log("Token", token);
//     if (!token) {
//       throw new ApiError(401, "Unauthorized request");
//     }

//     const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
   
//     req.user = decodedToken;

//     next();
//   } catch (error) {
//     if (error?.message === "jwt expired") {
//       throw new ApiError(401, "Access token expired");
//     }
//   }
// });

export const isLoggedIn = asyncHandler(async (req, res, next) => {
  try {
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
