"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    profilePhoto: {
        type: String,
        trim: true,
    }
});
exports.default = (0, mongoose_1.model)("Admin", AdminSchema, "Admin");
//# sourceMappingURL=index.js.map