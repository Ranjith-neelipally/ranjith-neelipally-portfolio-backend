import { Router } from "express";
import { GetAllProjects, CreateNewProject } from "../../controller/Projects";
import { ProjectValidationSchema } from "../../utils/Schema/Project";
import { Validtor } from "../../MiddleWare/validator";
import { verifyLoginToken } from "../../MiddleWare/TokenVerification";

const ProjectsRouter = Router();

ProjectsRouter.post("/check", GetAllProjects);
ProjectsRouter.post(
  "/create",
  Validtor(ProjectValidationSchema),
  verifyLoginToken,
  CreateNewProject
);
export default ProjectsRouter;
