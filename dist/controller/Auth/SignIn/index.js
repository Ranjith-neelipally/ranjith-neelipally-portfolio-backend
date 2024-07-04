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
exports.HandleLogin = void 0;
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const Email_1 = require("../../../utils/Email");
const VerificationCode_1 = __importDefault(require("../../../Modal/VerificationCode"));
const helpers_1 = require("../../../utils/helpers");
const HandleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield Admin_1.default.findOne({ email });
        if (!user) {
            res.status(403).json({ error: "User Nnot found" });
        }
        else {
            const matched = yield user.comparePassword(password);
            if (!matched) {
                res.status(403).json({ error: "Password mismatch" });
            }
            else {
                const verificationToken = (0, helpers_1.generateRandomNumber)(6);
                yield VerificationCode_1.default.create({
                    owner: user._id,
                    token: verificationToken,
                });
                (0, Email_1.sendVerificationMail)(verificationToken, {
                    email: user.email,
                    name: user.userName,
                    userId: user._id.toString(),
                });
                yield user.save();
                res.json({
                    id: user._id,
                    name: user.userName,
                });
            }
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.HandleLogin = HandleLogin;
