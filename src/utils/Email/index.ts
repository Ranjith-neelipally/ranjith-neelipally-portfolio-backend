import { Email } from "../Email/template/VerificationMai";
import { MAILTRAP_PASSWORD, MAILTRAP_USER, ADMIN_MAIL } from "../variables";
import nodemailer from "nodemailer";

interface Profile {
  name: string;
  email: string;
  userId?: string;
}

interface resetPassword {
  email: string;
  link: string;
  name: string;
}

const generateMailTransporter = () => {
  const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: MAILTRAP_USER,
      pass: MAILTRAP_PASSWORD,
    },
  });
  return transporter;
};

export const sendVerificationMail = async (token: string, profile: Profile) => {
  const transport = generateMailTransporter();

  const { name, email, userId } = profile;

  transport.sendMail({
    to: email,
    from: ADMIN_MAIL,
    html: Email({
      Otp: `Your OTP: ${token}`,
      userName: name,
      subject: "Verification Mail",
      message:
        "You are just a step away from accessing your research Pal account, We are sharing a verification code to access your account. The code is valid for 10 minutes and usable only once.",
    }),
  });
};