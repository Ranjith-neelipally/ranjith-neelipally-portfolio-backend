import { Router } from "express";
import { Validtor } from "../../MiddleWare/Validator/validator";
import { LoginValidationSchema } from "../../utils/Schema/LoginValidation";
import {
  HandleSignUp,
  HandleLogin,
  HandleLogout,
  VerifyOTP,
  UpdateAdminDetails,
} from "../../../src/controller/Auth";
import { verifyLoginToken } from "../../MiddleWare/TokenVerification";

const AuthRouter = Router();

AuthRouter.post("/signup", Validtor(LoginValidationSchema), HandleSignUp);

AuthRouter.post("/login", Validtor(LoginValidationSchema), HandleLogin);

AuthRouter.post("/verify", VerifyOTP);

AuthRouter.post("/logout", HandleLogout);

AuthRouter.post("/verify-token", verifyLoginToken, (req, res) => {
  res.status(200).json({ response: "Authorized Request!" });
});

AuthRouter.patch("/update-details", verifyLoginToken, UpdateAdminDetails);

export default AuthRouter;
