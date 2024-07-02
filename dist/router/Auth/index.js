"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = require("../../../src/MiddleWare/validator");
const LoginValidation_1 = require("../../utils/Schema/LoginValidation");
const Auth_1 = require("../../../src/controller/Auth");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/signup", (0, validator_1.Validtor)(LoginValidation_1.LoginValidationSchema), Auth_1.HandleSignUp);
AuthRouter.post("/login", (0, validator_1.Validtor)(LoginValidation_1.LoginValidationSchema), Auth_1.HandleLogin);
AuthRouter.post("/logout", Auth_1.HandleLogout);
exports.default = AuthRouter;
//# sourceMappingURL=index.js.map