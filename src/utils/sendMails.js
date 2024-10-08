import nodemailer from "nodemailer"
import env from "../config/env.config.js"
import __dirname from "../../dirname.js";

export const sendMail = async (email , subject, message) => {
    const transporter = nodemailer.createTransport({
        service:"gmail",
        port: 587,
        auth: {
            user:"carlosromero41290@gmail.com",
            pass: env.GMAIL_PASS
        }
    });

    await transporter.sendMail({
        from: "carlosromero41290@gmail.com",
        to: email,
        subject,
        text: message,
        html: `<div>${message}</div>`,
    });
};