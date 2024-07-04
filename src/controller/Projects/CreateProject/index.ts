import { RequestHandler } from "express";
import { ProjectInterface } from "src/@types/Projects";
import Admin from "../../../Modal/Admin";
import Project from "../../../Modal/Projects";
import mongoose from "mongoose";

export const CreateNewProject: RequestHandler = async (
  req: ProjectInterface,
  res
) => {
  const { userId, projectName, description, projectPreview } = req.body;
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid userId" });
  }
  try {
    const user = await Admin.findById(userId);
    if (!user) {
      res.status(400).json({ message: "User not found" });
    }
    const newProject = await Project.create({
      projectName,
      description,
      projectPreview,
      userId,
    });

    if (!newProject) {
      res.status(500).json({ message: "Project not created" });
    }

    user.ProjectIds.push(newProject._id);
    await user.save();

    res.json({
      message: "Project created successfully",
      Project: newProject,
      user: user,
    });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
