"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ProjectSchema = new mongoose_1.Schema({
    projectName: {
        type: String,
        required: false,
        trim: true,
        unique: true,
    },
    description: {
        type: String,
        required: false,
        trim: true,
    },
    projectPreview: {
        type: String,
        required: false,
    },
    userId: {
        type: String,
        required: false,
    },
    tag: {
        type: String,
        required: false,
    },
});
exports.default = (0, mongoose_1.model)("Project", ProjectSchema);
