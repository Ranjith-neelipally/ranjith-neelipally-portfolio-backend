import { Router } from "express";
import { AddSkills, GetAllSkills, UpdateSkills } from "../../controller/Skills";
import { SkillsValidationSchema } from "../../utils/Schema/Skills";
import { Validtor } from "../../MiddleWare/validator";
import { verifyLoginToken } from "../../MiddleWare/TokenVerification";

const SkillRouter = Router();

SkillRouter.get("/", GetAllSkills);
SkillRouter.post(
  "/add-skills",
  verifyLoginToken,
  Validtor(SkillsValidationSchema),
  AddSkills
);

SkillRouter.patch("/update-skills", UpdateSkills);

export default SkillRouter; 
