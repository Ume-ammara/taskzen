import {ApiError} from "../utils/api-error.js"
import {ApiResponse} from "../utils/api-response.js"

const healthCheck = async (req, res, next) =>{
   try {
     res.status(200).json(
         new ApiResponse(200, {message: "Server is running"})
     )
   } catch (error) {
      next(new ApiError(500, "Healthcheck failed", error?.message))
   }
}

export {healthCheck}