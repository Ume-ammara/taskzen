import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"



export const isLogedIn = asyncHandler(async (req, res, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorizatio")?.split("")[1]
    
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError("Invalid Access Token")
        }
    
        req.user = user
    
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})