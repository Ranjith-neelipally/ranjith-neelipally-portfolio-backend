"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AdminSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    profilePhotp: {
        data: Buffer,
        contentType: String,
        required: false,
    }
});
exports.default = (0, mongoose_1.model)("Admin", AdminSchema);
//# sourceMappingURL=index.js.map