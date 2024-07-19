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
exports.AddNewTestimonial = void 0;
const Testimonials_1 = __importDefault(require("../../../Modal/Testimonials"));
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const AddNewTestimonial = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, email, designation, message, adminMail } = req.body;
    try {
        const user = yield Admin_1.default.findOne({ email: adminMail });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const newTestimonial = yield Testimonials_1.default.create({
            userName,
            email,
            designation,
            message,
        });
        if (!newTestimonial) {
            return res.status(400).send("Failed to add testimonial");
        }
        const updatedUser = yield user.testimonials.push(newTestimonial._id);
        if (!updatedUser) {
            return res.status(400).send("Failed to update user");
        }
        if (updatedUser) {
            yield user.save();
        }
        res.status(201).send("Testimonial added successfully");
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.AddNewTestimonial = AddNewTestimonial;
