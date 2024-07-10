"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Admin_1 = require("../../controller/Admin");
const AdminRouter = (0, express_1.Router)();
AdminRouter.get("/", Admin_1.GetAdminDetails);
exports.default = AdminRouter;
