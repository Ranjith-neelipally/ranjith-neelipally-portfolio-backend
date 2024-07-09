"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./database");
const MiddleWare_1 = require("./MiddleWare");
const router_1 = require("./router");
const Check_1 = require("./controller/Check");
const cors = require("cors");
const app = (0, express_1.default)();
const port = process.env.PORT || 8083;
app.use(cors());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(MiddleWare_1.IgnoreFavIcon);
app.get("/favicon.ico", (req, res) => res.status(204).end());
app.get("/", Check_1.Home);
app.get("/check", Check_1.CheckDbConnection);
app.use("/auth", router_1.AuthRouter);
app.use("/projects", router_1.ProjectsRouter);
app.use("/skills", router_1.SkillRouter);
app.use("/testimonials", router_1.TestimonialsRouter);
app.listen(port, () => {
    return console.log(`Server is listening on http://localhost:${port}/testimonials`);
});
