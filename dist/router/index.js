"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestimonialsRouter = exports.ProjectsRouter = exports.SkillRouter = exports.AuthRouter = void 0;
const Auth_1 = __importDefault(require("./Auth"));
exports.AuthRouter = Auth_1.default;
const Projects_1 = __importDefault(require("./Projects"));
exports.ProjectsRouter = Projects_1.default;
const Skills_1 = __importDefault(require("./Skills"));
exports.SkillRouter = Skills_1.default;
const Testimonial_1 = __importDefault(require("./Testimonial"));
exports.TestimonialsRouter = Testimonial_1.default;
