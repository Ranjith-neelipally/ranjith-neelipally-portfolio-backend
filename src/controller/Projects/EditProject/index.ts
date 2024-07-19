import { RequestHandler } from "express";
import Projects from "../../../Modal/Projects";

export const EditProject: RequestHandler = async (req, res) => {
  const { projectId, projectName, description, projectPreview, tag } = req.body;
  try {
    const project = await Projects.findOne({ _id: projectId });
    if (!project) {
      res.status(403).json({ error: "Project not found" });
    } else {
      project.projectName = projectName;
      project.description = description;
      project.projectPreview = projectPreview;
      project.tag = tag;
      await project.save();
      res.json({ message: "Project Updated" });
    }
  } catch (error) {}
};
