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
exports.UpdateSkills = void 0;
const Skills_1 = __importDefault(require("../../../Modal/Skills"));
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const UpdateSkills = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, skills } = req.body;
    try {
        const admin = yield Admin_1.default.findById(userId);
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const skillObject = yield Skills_1.default.find({ _id: { $in: admin.skills } });
        if (!skillObject) {
            return res.status(404).json({ message: "Skills not found" });
        }
        const updatedSkills = yield Skills_1.default.updateMany({ _id: { $in: admin.skills } }, { $set: skills });
        if (updatedSkills.modifiedCount === 0) {
            return res.status(404).json({ message: "Skills not updated" });
        }
        const count = updatedSkills.modifiedCount;
        res.status(200).json({ message: `${count} Skills updated successfully` });
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.UpdateSkills = UpdateSkills;
