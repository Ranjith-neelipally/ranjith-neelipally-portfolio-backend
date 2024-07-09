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
exports.CheckDbConnection = exports.Home = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Home = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({ message: "Hello World!" });
});
exports.Home = Home;
const CheckDbConnection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (mongoose_1.default.connection.readyState === 1) {
        res.json({ message: "connected" });
    }
    else {
        res.json({ message: "not connected" });
    }
});
exports.CheckDbConnection = CheckDbConnection;
