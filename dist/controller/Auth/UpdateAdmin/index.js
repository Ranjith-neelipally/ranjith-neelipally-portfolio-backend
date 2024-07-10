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
exports.UpdateAdminDetails = void 0;
const Admin_1 = __importDefault(require("../../../Modal/Admin"));
const UpdateAdminDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, profilePic, userName } = req.body;
    try {
        const admin = yield Admin_1.default.findOne({ email });
        if (!admin) {
            return res.status(404).json({ error: "Admin not found!" });
        }
        const changes = yield Admin_1.default.updateOne({ profilePic, userName });
        if (!changes) {
            return res.status(404).json({ error: "Admin not found!" });
        }
        const count = yield changes.modifiedCount;
        if (count === 0) {
            return res.status(404).json({ error: "Details not updated!" });
        }
        return res
            .status(200)
            .json({ message: `${count} details updated successfully` });
    }
    catch (error) {
        res.status(500).json(error);
    }
});
exports.UpdateAdminDetails = UpdateAdminDetails;
