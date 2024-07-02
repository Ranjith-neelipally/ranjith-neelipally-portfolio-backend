import { Request } from "express";

export interface AdminHandler extends Request {
  name: string;
  email: string;
  profilePhoto: string;
}
