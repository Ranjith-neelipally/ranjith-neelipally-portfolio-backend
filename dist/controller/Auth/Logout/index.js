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
exports.HandleLogout = void 0;
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const HandleLogout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.body;
    try {
        const user = yield Admin_1.default.findOne({ email });
        if (user) {
            user.tokens = [];
            yield user.save();
            res.json({
                message: "User logged out successfully",
            });
        }
        else {
            res.status(403).json({ error: "User not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.HandleLogout = HandleLogout;
