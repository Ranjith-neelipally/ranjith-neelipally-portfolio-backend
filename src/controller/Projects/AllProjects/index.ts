import { RequestHandler } from "express";
import { ProjectInterface } from "src/@types/Projects";
import Admin from "../../../Modal/Admin";
import Projects from "../../../Modal/Projects";

export const GetAllProjects: RequestHandler = async (
  req: ProjectInterface,
  res
) => {
  const { email } = req.query;
  try {
    const user = await Admin.findOne({ email });
    if (!user) {
      res.status(403).json({ error: "User not found" });
    } else {
      let projects = await Projects.find({ _id: { $in: user.ProjectIds } });
      res.json(projects);
    }
  } catch (error) {}
};
