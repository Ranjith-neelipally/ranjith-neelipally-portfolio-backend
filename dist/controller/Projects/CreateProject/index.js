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
exports.CreateNewProject = void 0;
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const Projects_1 = __importDefault(require("../../../Modal/Projects"));
const mongoose_1 = __importDefault(require("mongoose"));
const CreateNewProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, projectName, description, projectPreview } = req.body;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid userId" });
    }
    try {
        const user = yield Admin_1.default.findById(userId);
        if (!user) {
            res.status(400).json({ message: "User not found" });
        }
        const newProject = yield Projects_1.default.create({
            projectName,
            description,
            projectPreview,
            userId,
        });
        if (!newProject) {
            res.status(500).json({ message: "Project not created" });
        }
        user.ProjectIds.push(newProject._id);
        yield user.save();
        res.json({
            message: "Project created successfully",
            Project: newProject,
        });
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.CreateNewProject = CreateNewProject;
