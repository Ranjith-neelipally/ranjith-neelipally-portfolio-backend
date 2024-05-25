import { Request } from "express";

export interface AdminHandler extends Request {
  body: {
    name: string;
    email: string;
    profilePhoto: string;
  };
}
