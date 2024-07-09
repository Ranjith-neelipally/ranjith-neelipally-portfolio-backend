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
exports.DeleteProject = void 0;
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const Projects_1 = __importDefault(require("../../../Modal/Projects"));
const DeleteProject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, projectId } = req.body;
    try {
        const user = yield Admin_1.default.findById({ _id: userId });
        if (!user) {
            return res.json({ error: "User not found" });
        }
        if (user) {
            const projectIds = user.ProjectIds;
            if (!projectIds.includes(projectId))
                return res.json({ error: "Project not found from admin" });
            else {
                const index = projectIds.indexOf(projectId);
                yield projectIds.splice(index, 1);
                user.save();
                const project = yield Projects_1.default.findById({ _id: projectId });
                if (!project) {
                    return res.json({ error: "Project not found" });
                }
                const status = yield Projects_1.default.findByIdAndDelete({ _id: projectId });
                if (!status) {
                    return res.json({ error: "Project not deleted" });
                }
                return res.json({ message: "Project deleted" });
            }
        }
        return res.json({ message: "user found" });
    }
    catch (error) {
        res.json({ error: error });
    }
});
exports.DeleteProject = DeleteProject;
