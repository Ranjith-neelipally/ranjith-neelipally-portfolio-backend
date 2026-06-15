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
exports.HandleSignUp = void 0;
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const HandleSignUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, userName, slug } = req.body;
    try {
        const existingEmail = yield Admin_1.default.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Admin with this email already exists" });
        }
        let finalSlug = slug;
        if (!finalSlug) {
            finalSlug = userName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
        }
        else {
            finalSlug = finalSlug.toLowerCase().trim();
            if (!/^[a-z0-9-]+$/.test(finalSlug)) {
                return res.status(400).json({ error: "Slug must be URL-friendly (only lowercase alphanumeric and hyphens)" });
            }
        }
        const existingSlug = yield Admin_1.default.findOne({ slug: finalSlug });
        if (existingSlug) {
            return res.status(400).json({ error: "Slug is already in use" });
        }
        const user = yield Admin_1.default.create({
            email,
            password,
            userName,
            slug: finalSlug,
        });
        if (user) {
            res.json({ message: "User created successfully" });
        }
        else {
            res.status(500).json({ error: "User not created" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.HandleSignUp = HandleSignUp;
