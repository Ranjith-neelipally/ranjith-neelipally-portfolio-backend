import { Router } from "express";
import { Validtor } from "../../../src/MiddleWare/validator";
import { LoginValidationSchema } from "../../utils/Schema/LoginValidation";
import {
  HandleSignUp,
  HandleLogin,
  HandleLogout,
} from "../../../src/controller/Auth";

const AuthRouter = Router();

AuthRouter.post("/signup", Validtor(LoginValidationSchema), HandleSignUp);

AuthRouter.post("/login", Validtor(LoginValidationSchema), HandleLogin);

AuthRouter.post("/logout", HandleLogout);

export default AuthRouter;
