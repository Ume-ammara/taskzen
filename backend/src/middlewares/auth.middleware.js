import { ApiError } from "../utils/api-error.js";
import { asyncHandler } from "../utils/async-handler.js";
import jwt from "jsonwebtoken"
import {User} from "../models/user.models.js"



export const isLogedIn = asyncHandler(async (req, res, next)=>{
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.split(" ")[1]
        console.log("Token", token)
        if(!token){
            throw new ApiError(401, "Unauthorized request")
        }
    
        const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // const user = await User.findById(decodedToken?._id)
    
        // if(!user){
        //     throw new ApiError("Invalid Access Token")
        // }
    
        req.user = decodedToken
    
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Access Token")
    }
})

export const isAdmin = asyncHandler(async(req , res, next)=>{
    if(req.user.role !== "admin"){
        throw new ApiError(403, "Unauthorized request")
    }
    next()
})