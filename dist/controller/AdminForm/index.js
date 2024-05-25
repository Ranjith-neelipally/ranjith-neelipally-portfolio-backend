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
exports.HandleAdminForm = void 0;
const AdminForm_1 = __importDefault(require("../../Modal/AdminForm"));
const HandleAdminForm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, profilePhoto } = req.body;
    if (name && email) {
        const existingUser = yield AdminForm_1.default.findOne({ email });
        if (existingUser) {
            return res.json({ error: "user already exist" });
        }
        const admin = yield AdminForm_1.default.create({
            name: name,
            email: email,
            profilePhoto,
        });
        res.status(200).json({ message: admin });
    }
    else {
        res.status(400).json({ message: "not working" });
    }
});
exports.HandleAdminForm = HandleAdminForm;
//# sourceMappingURL=index.js.map