import { Request } from "express";

export interface ProjectInterface extends Request {
  body: {
    projectName?: string;
    description?: string;
    projectPreview?: string;
  };
}
