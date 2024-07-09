"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./database");
const mongoose_1 = __importDefault(require("mongoose"));
const AdminForm_1 = require("./controller/AdminForm");
const validator_1 = require("./MiddleWare/validator");
const validationSchema_1 = require("./utils/validationSchema");
const GetAdminDetails_1 = require("./controller/GetAdminDetails");
const favIcon_1 = require("./MiddleWare/favIcon");
const Auth_1 = __importDefault(require("./router/Auth"));
const Projects_1 = __importDefault(require("./router/Projects"));
const Skills_1 = __importDefault(require("./router/Skills"));
const cors = require("cors");
const app = (0, express_1.default)();
const port = process.env.PORT || 8083;
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(favIcon_1.IgnoreFavIcon);
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/", (_req, res) => {
    return res.json({ message: "Hello World!" });
});
app.get("/check", (req, res) => {
    if (mongoose_1.default.connection.readyState === 1) {
        res.json({ message: "connected" });
    }
    else {
        res.json({ message: "not connected" });
    }
});
app.use("/auth", Auth_1.default);
app.use("/projects", Projects_1.default);
app.use("/skills", Skills_1.default);
app.post("/adminForm", (0, validator_1.Validtor)(validationSchema_1.ValidationSchema), AdminForm_1.HandleAdminForm);
app.get("/getAdminDetails", GetAdminDetails_1.GetAdminDetails);
app.listen(port, () => {
    return console.log(`Server is listening on http://localhost:${port}/adminForm`);
});
