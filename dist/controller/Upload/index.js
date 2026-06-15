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
exports.HandleFileUpload = void 0;
const blob_1 = require("@vercel/blob");
const variables_1 = require("../../utils/variables");
const Admin_1 = __importDefault(require("../../Modal/Admin"));
const HandleFileUpload = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { filename, fileData, userId, type } = req.body;
    if (!filename || !fileData) {
        return res.status(400).json({ error: "Filename and fileData are required" });
    }
    try {
        const matches = fileData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
            return res.status(400).json({ error: "Invalid base64 file data" });
        }
        const contentType = matches[1];
        const buffer = Buffer.from(matches[2], "base64");
        let finalFilename = filename;
        if (type === "profile") {
            if (!userId) {
                return res.status(400).json({ error: "userId is required for profile picture upload" });
            }
            const admin = yield Admin_1.default.findById(userId);
            if (!admin) {
                return res.status(404).json({ error: "Admin user not found" });
            }
            if (admin.profilePic && admin.profilePic.includes("blob.vercel-storage.com")) {
                try {
                    yield (0, blob_1.del)(admin.profilePic, { token: variables_1.BLOB_READ_WRITE_TOKEN });
                    console.log(`Deleted old profile pic: ${admin.profilePic}`);
                }
                catch (err) {
                    console.error("Failed to delete old profile pic:", err);
                }
            }
            const ext = filename.includes(".") ? filename.substring(filename.lastIndexOf(".")) : ".png";
            const cleanName = admin.userName.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
            finalFilename = `profile_pic_${cleanName}${ext}`;
        }
        const blob = yield (0, blob_1.put)(finalFilename, buffer, {
            contentType,
            access: "public",
            token: variables_1.BLOB_READ_WRITE_TOKEN
        });
        if (type === "profile" && userId) {
            yield Admin_1.default.findByIdAndUpdate(userId, { profilePic: blob.url });
        }
        res.status(200).json({
            message: "File uploaded successfully",
            url: blob.url
        });
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: error.message || "Failed to upload file to Vercel Blob" });
    }
});
exports.HandleFileUpload = HandleFileUpload;
