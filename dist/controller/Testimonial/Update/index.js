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
exports.UpdateTestimonial = void 0;
const Testimonials_1 = __importDefault(require("../../../Modal/Testimonials"));
const helpers_1 = require("../../../utils/helpers");
const VerificationCode_1 = __importDefault(require("../../../Modal/VerificationCode"));
const Email_1 = require("../../../utils/Email");
const UpdateTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield Testimonials_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({ response: "Testimonial not found!" });
        }
        const verificationToken = (0, helpers_1.generateRandomNumber)(6);
        yield VerificationCode_1.default.create({
            owner: user._id,
            token: verificationToken,
        });
        if (user.email && user.userName && user._id) {
            (0, Email_1.sendVerificationMail)(verificationToken, {
                email: user.email,
                name: user.userName,
                userId: user._id.toString(),
            });
            return res.json({ message: "Verification mail sent!" });
        }
        else {
            return res.status(400).json({ response: "Incomplete user data" });
        }
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.UpdateTestimonial = UpdateTestimonial;
