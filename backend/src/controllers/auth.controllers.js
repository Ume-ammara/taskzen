import {asyncHandler} from "../utils/async-handler.js"
import {ApiError} from "../utils/api-error.js"
import {ApiResponse} from "../utils/api-response.js"
import User from "../models/user.models.js"

import {
    registerUserSchema,
    logoutSchema,
    LoginUserSchema,
    forgotPasswordSchema,
    resetPasswordSchema,
    updateProfileSchema,
    refreshTokenSchema

     } from "../schemas/auth.schema.js"

export const registrUser = asyncHandler(async (req, res) =>{

    const {fullname, username, email, password, } = registerUserSchema.parse(req.body)

    

})