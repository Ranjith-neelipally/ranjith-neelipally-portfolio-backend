"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validator_1 = require("../../MiddleWare/Validator/validator");
const LoginValidation_1 = require("../../utils/Schema/LoginValidation");
const Auth_1 = require("../../../src/controller/Auth");
const TokenVerification_1 = require("../../MiddleWare/TokenVerification");
const AuthRouter = (0, express_1.Router)();
AuthRouter.post("/signup", (0, validator_1.Validtor)(LoginValidation_1.LoginValidationSchema), Auth_1.HandleSignUp);
AuthRouter.post("/login", (0, validator_1.Validtor)(LoginValidation_1.LoginValidationSchema), Auth_1.HandleLogin);
AuthRouter.post("/verify", Auth_1.VerifyOTP);
AuthRouter.post("/logout", Auth_1.HandleLogout);
AuthRouter.post("/verify-token", TokenVerification_1.verifyLoginToken, (req, res) => {
    res.status(200).json({ response: "Authorized Request!" });
});
AuthRouter.patch("/update-details", TokenVerification_1.verifyLoginToken, Auth_1.UpdateAdminDetails);
exports.default = AuthRouter;
