import {z} from "zod"


export const  registerUserSchema = z.object({
    fullname: z.string().trim().min(3, "Full name must be at least 3 characters"),
    username: z.string().trim().min(3, "Username must be at least 3 characters"),
    email: z.string().trim().email("Enter a valid email"),
    password: z.string().trim().min(6, "Password must be at least 6 characters"),
})

export const LoginUserSchema = z.object({
    email: z.string().trim().email("Enter a valid email"),
    password: z.string().trim().min(6, "Password must be at least 6 characters")
})

export const forgotPasswordSchema = z.object({
    email: z.string().trim().email("Invalid email address")
})

export const resetPasswordSchema = z.object({
    token: z.string().nonempty("Token is required"),
    newPassword: z.string().trim().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().trim().min(6, "Password must be at least 6 characters")
}).refine((data) => data.newPassword === data.confirmPassword,{
    message: "Password do not match",
    path: ["confirmPassword"],
})

export const updateProfileSchema = z.object({
     fullname: z.string().trim().min(3, "Full name must be at least 3 characters"),
})


export const verifyEmailSchema = z.object({
    token: z.string().nonempty("Token is required")
})

