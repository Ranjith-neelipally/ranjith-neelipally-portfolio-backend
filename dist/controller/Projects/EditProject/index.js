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
exports.EditProject = void 0;
const Projects_1 = __importDefault(require("../../../Modal/Projects"));
const EditProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, projectName, description, projectPreview } = req.body;
    try {
        const project = yield Projects_1.default.findOne({ _id: projectId });
        if (!project) {
            res.status(403).json({ error: "Project not found" });
        }
        else {
            project.projectName = projectName;
            project.description = description;
            project.projectPreview = projectPreview;
            yield project.save();
            res.json({ message: "Project Updated" });
        }
    }
    catch (error) {
    }
});
exports.EditProject = EditProject;
