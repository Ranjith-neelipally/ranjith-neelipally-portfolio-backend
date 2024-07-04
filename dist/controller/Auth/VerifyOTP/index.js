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
const VerificationCode_1 = __importDefault(require("../../../../src/Modal/VerificationCode"));
const Admin_1 = __importDefault(require("../../../../src/Modal/Admin"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const variables_1 = require("../../../utils/variables");
const VerifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, otp } = req.body;
    const verificationToken = yield VerificationCode_1.default.findOne({
        owner: userId,
    });
    const user = yield Admin_1.default.findOne({ _id: userId });
    if (!verificationToken) {
        return res.status(403).json({ error: "Inavid OTP" });
    }
    const matched = yield verificationToken.compareToken(otp);
    if (!matched) {
        return res.status(403).json({ error: "Inavid OTP" });
    }
    if (!user) {
        return res.status(403).json({ error: "User not found" });
    }
    const jsontoken = jsonwebtoken_1.default.sign({ userId: userId }, variables_1.TOKEN_KEY);
    user.tokens.push(jsontoken);
    yield user.save();
    yield VerificationCode_1.default.findByIdAndDelete(verificationToken._id);
    res.json({ authToken: jsontoken });
});
exports.VerifyOTP = VerifyOTP;
