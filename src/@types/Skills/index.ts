import { Request } from "express";

export interface SkillsInterface extends Request {
  frameWorks?: [string];
  skills?: [string];
  tools?: [string];
  email?: string;
}