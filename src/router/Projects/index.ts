import { Router } from "express";
import {
  GetAllProjects,
  CreateNewProject,
  EditProject,
  DeleteProject,
  GetProjectDetails,
} from "../../controller/Projects";
import {
  EditProjectValidationSchema,
  ProjectValidationSchema,
} from "../../utils/Schema/Project";
import { Validtor } from "../../MiddleWare/Validator/validator";
import { verifyLoginToken } from "../../MiddleWare/TokenVerification";

const ProjectsRouter = Router();

ProjectsRouter.get("/get-all", GetAllProjects);
ProjectsRouter.get("/get-project", GetProjectDetails);
ProjectsRouter.post(
  "/create",
  verifyLoginToken,
  Validtor(ProjectValidationSchema),
  CreateNewProject
);
ProjectsRouter.patch(
  "/edit-project",
  verifyLoginToken,
  Validtor(EditProjectValidationSchema),
  EditProject
);

ProjectsRouter.delete("/delete-project", verifyLoginToken, DeleteProject);

export default ProjectsRouter;
