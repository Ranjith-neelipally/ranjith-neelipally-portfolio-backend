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
exports.GetProjectDetails = void 0;
const Projects_1 = __importDefault(require("../../../Modal/Projects"));
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const GetProjectDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { projectId, email } = req.query;
    const user = yield Admin_1.default.findOne({ email });
    if (!user) {
        res.status(404).json({ error: "User not found" });
    }
    try {
        if (user.ProjectIds.length > 0 && user.ProjectIds.includes(projectId)) {
            const project = yield Projects_1.default.findOne({ _id: projectId });
            if (!project) {
                res.status(404).json({ error: "Project not found" });
            }
            res.json(project);
        }
        else {
            res.status(404).json({ error: "Project not found" });
        }
    }
    catch (error) {
        res.status(500).json({ error: error });
    }
});
exports.GetProjectDetails = GetProjectDetails;
