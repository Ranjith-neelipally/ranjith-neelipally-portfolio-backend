import { Request } from "express";

export interface ProjectInterface extends Request {
  projectName?: string;
  description?: string;
  projectPreview?: string;
  userId?: string;
  tag?: string;
}
