import { sendMail, emailVerificationMailGenContent } from "../utils/mail.js";
import { ApiError } from "../utils/api-error.js";



export const sendEmailVerification = async(user)=>{
    const {hashedToken, unHashedtoken, tokenExpiry} = user.generateTemporaryToken()
    user.emailVerificationToken = hashedToken
    user.verificationTokenExpiry = tokenExpiry
    await user.save()

    const emailVerificationUrl = `${process.env.FRONTEND_URL}/auth/verify/${unHashedtoken}`

    try {
        await sendMail({
            email: user.email,
            subject:"Email verification",
            mailGenContent: emailVerificationMailGenContent(emailVerificationUrl)
        })
    } catch (error) {
         throw new ApiError(500, "Failed to send verification email");
    }
}