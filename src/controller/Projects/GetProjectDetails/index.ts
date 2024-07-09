import { RequestHandler } from "express";
import { ProjectInterface } from "src/@types/Projects";
import Projects from "../../../Modal/Projects";
import Admin from "../../../Modal/Admin";

export const GetProjectDetails: RequestHandler = async (
  req: ProjectInterface,
  res
) => {
  const { projectId, email } = req.query;
  const user = await Admin.findOne({ email });
  if (!user) {
    res.status(404).json({ error: "User not found" });
  }
  try {
    if (user.ProjectIds.length > 0 && user.ProjectIds.includes(projectId)) {
      const project = await Projects.findOne({ _id: projectId });
      if (!project) {
        res.status(404).json({ error: "Project not found" });
      }
      res.json(project);
    } else {
      res.status(404).json({ error: "Project not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
