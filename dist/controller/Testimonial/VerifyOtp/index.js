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
exports.VerifyOTP = void 0;
const VerificationCode_1 = __importDefault(require("../../../Modal/VerificationCode"));
const Testimonials_1 = __importDefault(require("../../../Modal/Testimonials"));
const VerifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, otp, designation, message, userName } = req.body;
    try {
        const user = yield Testimonials_1.default.findById(userId);
        if (!user) {
            return res.status(403).json({ error: "User not found" });
        }
        if (user.canEdit === false) {
            const verificationToken = yield VerificationCode_1.default.findOne({
                owner: userId,
            });
            if (!verificationToken) {
                return res.status(403).json({ error: "Invalid OTP" });
            }
            const matched = yield verificationToken.compareToken(otp);
            if (!matched) {
                return res.status(403).json({ error: "Invalid OTP" });
            }
            user.canEdit = true;
            yield user.save();
            yield VerificationCode_1.default.findByIdAndDelete(verificationToken._id);
        }
        if (user.canEdit) {
            const updatedTestimonials = yield Testimonials_1.default.updateMany({ _id: userId }, { designation, message, userName });
            const count = updatedTestimonials.modifiedCount;
            if (count > 0) {
                user.canEdit = false;
                yield user.save();
            }
            return res.status(200).json({
                message: "OTP verified successfully",
                response: `${count} Testimonial(s) updated successfully`,
            });
        }
        res.status(500).json({ error: "Re-verify OTP to edit" });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error });
    }
});
exports.VerifyOTP = VerifyOTP;
