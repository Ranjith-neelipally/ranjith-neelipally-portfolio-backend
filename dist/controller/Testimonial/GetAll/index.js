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
exports.GetAllTestimonials = void 0;
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const Testimonials_1 = __importDefault(require("../../../Modal/Testimonials"));
const GetAllTestimonials = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = req.query;
    try {
        const user = yield Admin_1.default.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const testimonials = yield Testimonials_1.default.find({
            _id: { $in: user.testimonials },
        });
        if (!testimonials) {
            return res.status(400).json({ message: "Testimonials not found" });
        }
        return res.status(200).json(testimonials);
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.GetAllTestimonials = GetAllTestimonials;
