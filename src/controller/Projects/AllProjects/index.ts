import { RequestHandler } from "express";
import { ProjectInterface } from "src/@types/Projects";

export const GetAllProjects: RequestHandler = (req: ProjectInterface, res) => {
  res.json({ message: "All Projects" });
};
