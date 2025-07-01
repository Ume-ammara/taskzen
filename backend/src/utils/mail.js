import Mailgen from "mailgen"
import nodemailer from "nodemailer"

export const sendMail = async (options) => {
    const mailGenerator = new Mailgen({
        theme: 'default',
        product: {

            name: 'Task Manager',
            link: 'https://mailgen.js/'

        }
    });

    var emailText = mailGenerator.generatePlaintext(options.mailGenContent);
    var emailHtml = mailGenerator.generate(options.mailGenContent);

    const transporter = nodemailer.createTransport({
        host: process.env.MAILTRAP_SMTP_HOST,
        port: process.env.MAILTRAP_SMTP_PORT,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILTRAP_SMTP_USER,
            pass: process.env.MAILTRAP_SMTP_PASS
        },
    });

    const mail = {
        from: 'mail.taskmanager@gamil.com',
        to: options.email,
        subject: options.subject,
        text: emailText, // plain‑text body
        html: emailHtml, // HTML body
    };

    try {
        await transporter.sendMail(mail)
    } catch (error) {
        console.error("Email failed", error)
    }

}

export const emailVerificationMailGenContent = (username, verificationUrl) => {
    return {
        body: {
            name: username,
            intro: "Welcome to Taskzen! We're very excited to have you on board.",
            action: {
                instructions: 'To get started with Taskzen, please click here:',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Verify your email',
                    link: verificationUrl,
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'

        }
    }
}

export const forgotPasswordMailGenContent = (username, passwordRestUrl) => {
    return {
        body: {
            name: username,
            intro: "We got a request to reset your password",
            action: {
                instructions: 'To change your password click the button',
                button: {
                    color: '#22BC66', // Optional action button color
                    text: 'Reset password',
                    link: passwordRestUrl,
                }
            },
            outro: 'Need help, or have questions? Just reply to this email, we\'d love to help.'

        }
    }
}