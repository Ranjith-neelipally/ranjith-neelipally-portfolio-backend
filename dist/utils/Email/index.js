"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVerificationMail = void 0;
const VerificationMai_1 = require("../Email/template/VerificationMai");
const variables_1 = require("../variables");
const nodemailer_1 = __importDefault(require("nodemailer"));
const generateMailTransporter = () => {
    const transporter = nodemailer_1.default.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: variables_1.MAILTRAP_USER,
            pass: variables_1.MAILTRAP_PASSWORD,
        },
    });
    return transporter;
};
const sendVerificationMail = (token, profile) => __awaiter(void 0, void 0, void 0, function* () {
    const transport = generateMailTransporter();
    const { name, email, userId } = profile;
    transport.sendMail({
        to: email,
        from: variables_1.ADMIN_MAIL,
        html: (0, VerificationMai_1.Email)({
            Otp: `Your OTP: ${token}`,
            userName: name,
            subject: "Verification Mail",
            message: "You are just a step away from accessing your research Pal account, We are sharing a verification code to access your account. The code is valid for 10 minutes and usable only once.",
        }),
    });
});
exports.sendVerificationMail = sendVerificationMail;
