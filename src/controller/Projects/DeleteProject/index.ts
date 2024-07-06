import { RequestHandler } from "express";
import { ProjectInterface } from "src/@types/Projects";
import Admin from "../../../Modal/Admin";
import Project from "../../../Modal/Projects";

export const DeleteProject: RequestHandler = async (
  req: ProjectInterface,
  res
) => {
  const { userId, projectId } = req.body;
  try {
    const user = await Admin.findById({ _id: userId });
    if (!user) {
      return res.json({ error: "User not found" });
    }

    if (user) {
      const projectIds = user.ProjectIds;
      if (!projectIds.includes(projectId))
        return res.json({ error: "Project not found from admin" });
      else {
        const index = projectIds.indexOf(projectId);
        await projectIds.splice(index, 1);
        user.save();
        const project = await Project.findById({ _id: projectId });
        if (!project) {
          return res.json({ error: "Project not found" });
        }
        const status = await Project.findByIdAndDelete({ _id: projectId });
        if (!status) {
          return res.json({ error: "Project not deleted" });
        }

        return res.json({ status });
      }
    }
    return res.json({ message: "user found" });
  } catch (error) {
    res.json({ error: error });
  }
};
