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
exports.GetAllSkills = void 0;
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const Skills_1 = __importDefault(require("../../../Modal/Skills"));
const GetAllSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    const user = yield Admin_1.default.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    const allSkills = yield Skills_1.default.findOne({ _id: { $in: user.skills } });
    return res.status(200).json({ message: "User found", allSkills });
});
exports.GetAllSkills = GetAllSkills;
